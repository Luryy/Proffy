import { Request, Response, response } from 'express';
import knex from '../database/connection';

class ClassesController{

    async index (req: Request, res: Response){
        const totalConnections = await knex('connections').count( '* as total' );

        const { total } = totalConnections[0];

        return res.json({ total });

    }

    async create (req: Request, res: Response){
        const { user_id } = req.body;

        await knex('connections').insert({user_id});

        return res.status(201).send();
    }

}

export default ClassesController;