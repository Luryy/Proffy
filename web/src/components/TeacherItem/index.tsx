import React from 'react';
import './styles.css'


import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

export interface Teacher{ 
    id: string,
    name: string,
    bio: string,
    avatar: string,
    cost: number,
    subject: string,
    whatsapp: string,  
}

interface TeacherItemProps{
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

    function sendConnection(){
        api.post('connections', {
            user_id: teacher.id
        })
    }
    return(
        <article className="teacher-item">
                <header>
                    <img src={teacher.avatar} alt={teacher.name}/>
                    <div>
                        <strong>
                            {teacher.name}
                        </strong>
                        <span>{teacher.subject}</span>
                    </div>
                </header>
                <p>
                    {teacher.bio}
                </p>
                <footer>
                    <p>
                        Preço/hora
                        <strong>R$ {teacher.cost.toFixed(2)}</strong>
                    </p>

                    <a target="_blank" onClick={sendConnection} href={`https://wa.me/${teacher.whatsapp}`}>
                        <img src={whatsappIcon} alt="WhatsApp Icon"/>
                        Entrar em Contato
                    </a>
                </footer>
            </article>
    )
}
export default TeacherItem;