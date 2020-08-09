import React, {useState, FormEvent} from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';


function TeacherForm(){
    const history = useHistory();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

 
    const[scheduleItems, setScheduleItems] = useState([{week_day: 0, from:'', to:''}]);

    function addNewScheduleIntem(){
        setScheduleItems([
            ...scheduleItems,
            {week_day: 0, from:'', to:''}
        ])
    }

    function setScheduleItemsValues(position: number, field:string, value:string){
        const updateScheduleItems = scheduleItems.map((scheduleItem , index) => {
            if(position === index){
                return({...scheduleItem, [field]: value})
            } else {
                return scheduleItem;
            }

        })
        
        setScheduleItems(updateScheduleItems);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro Realizado com sucesso');
            history.push('/');
            })
          .catch(() => alert('Erro ao realizar o cadastro'));

    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que legal que você quer dar aulas"
                description="O primeiro passo é preencher o formulário abaixo"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>

                        <Input 
                            name="name" 
                            label="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)} />
                        <Input 
                            name="whatsapp" 
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)} />
                        <TextArea 
                            name="bio" 
                            label="Biografia"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)} />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select 
                            name="subject" 
                            label="Matéria"
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
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)} 

                        />
                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula" 
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />

                    </fieldset>

                    <fieldset>
                        <legend> 
                            Horários Disponíveis 
                            <button type="button" onClick={addNewScheduleIntem}>
                                + Novo Horário
                            </button>
                        </legend>

                        {scheduleItems.map((schedule, index) => {
                        return(
                                <div key={index} className="schedule-item">
                                    <Select 
                                        name="week-day" 
                                        label="Dia da semana"
                                        value={schedule.week_day}
                                        onChange={e => setScheduleItemsValues(index, "week_day", e.target.value)}
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
                                        name="from" 
                                        label="Das" 
                                        type="time"
                                        value={schedule.from} 
                                        onChange={e => setScheduleItemsValues(index, "from", e.target.value)}
                                    />
                                    <Input 
                                        name="to" 
                                        label="Até" 
                                        type="time"
                                        value={schedule.to} 
                                        onChange={e => setScheduleItemsValues(index, "to", e.target.value)}
                                    />
                                </div>
                            )
                        })}

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante <br />
                            Preecha todos os dados
                        </p>
                        <button type="submit">
                            Salvar Cadastro
                        </button>

                    </footer>
                </form>
            </main>
        </div>
    )
}
export default TeacherForm