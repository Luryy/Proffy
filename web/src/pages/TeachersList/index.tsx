import React, { useState, FormEvent } from 'react';
import './styles.css'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';


function TeacherList(){

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function handleSubmit(e: FormEvent){
        e.preventDefault();

        const classes = await api.get('classes', {
                            params:{
                                subject,
                                week_day: weekDay,
                                time,
                            }
                        })

       setTeachers(classes.data);

    }

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os Proffys disponveis">
                <form id="search-term" onSubmit={handleSubmit}>
                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        options={[
                            {value: "Matemática", label: "Matemática"},
                            {value: "Química", label: "Química"},
                            {value: "Português", label: "Português"},
                            {value: "Biologa", label: "Biologa"},
                            {value: "Física", label: "Física"},
                            {value: "Geografia", label: "Geografia"},
                            {value: "Artes", label: "Artes"},
                            {value: "Redação", label: "Redação"},
                            {value: "História", label: "História"}
                        ]} 

                    />
                    <Select 
                        name="week-day" 
                        label="Dia da semana"
                        value={weekDay}
                        onChange={(e) => setWeekDay(e.target.value)}
                        options={[
                            {value: "0", label: "Domingo"},
                            {value: "1", label: "Segunda-Feira"},
                            {value: "2", label: "Terça-Feira"},
                            {value: "3", label: "Quarta-Feira"},
                            {value: "4", label: "Quinta-Feira"},
                            {value: "5", label: "Sexta-Feira"},
                            {value: "6", label: "Sábado"}
                        ]} 

                    />
                    <Input 
                        name="time" 
                        label="Hora" 
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)} 
                    />

                    <button type="submit">
                        Buscar
                    </button>

                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return(
                        <TeacherItem key={teacher.id} teacher={teacher} />
                    )})
                }
                
            </main>
        </div>
    )
}
export default TeacherList