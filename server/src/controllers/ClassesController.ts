import { Request, Response, response } from 'express';
import knex from '../database/connection';
import convertHourToMinute from '../utils/convertHourToMinute';

interface ScheduleItem {
    week_day: string,
    from: string,
    to: string,
}

class ClassesController{

    async index (req: Request, res: Response){
        
        const filters = req.query;

        const week_day = filters.week_day as string;
        const subejct = filters.subject as string;
        const time = filters.time as string;

        if(!week_day || !subejct || !time){
            res.status(400).json({
                error: "Missing filters to search classes"
            })
        }

        const timeinMinutes = convertHourToMinute(time);

        const classes = await knex('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeinMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeinMinutes])
            })
            .where('classes.subject', '=', subejct)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);
        
        

        return res.json(classes);

    }

    async create (req: Request, res: Response){
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule,
        } = req.body

        const trx = await knex.transaction();

        try{

            const insetedUsers = await trx('users').insert({
                name,
                avatar,
                bio,
                whatsapp,
            });

            const user_id = insetedUsers[0];

            const insertedClasses = await trx('classes').insert({
                subject,
                cost,
                user_id,
            })

            const class_id = insertedClasses[0];

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return{
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinute(scheduleItem.from),
                    to: convertHourToMinute(scheduleItem.to)
                }
            })

            await trx('class_schedule').insert(classSchedule);

            await trx.commit();

            res.status(201).send()

        } catch(err){
            await trx.rollback();
            console.log(err);
            res.status(400).json({
                error: 'Unexpeted error while creating a new class'
            })
        }

        
    }

}

export default ClassesController;