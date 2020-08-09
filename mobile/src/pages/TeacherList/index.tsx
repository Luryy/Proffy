import React, { useState } from 'react';
import { View,  Text, AsyncStorage } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons";
import api from '../../services/api';

function TeacherList(){

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    const [favorites, setFavorites] = useState<number[]>([]);

    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    
    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if (response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })
                setFavorites(favoritedTeachersIds);
            }
        })
    }

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleSubmitFilters(){

        loadFavorites();

        const classes = await api.get('classes', {
                            params:{
                                subject,
                                week_day: weekDay,
                                time,
                            }
                        })

        setIsFiltersVisible(false);
        setTeachers(classes.data);

    }
    
    return(
        <View style={styles.container}>
            <PageHeader 
                title='Proffys Disponíveis'
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name='filter' size={20} color='#fff' />
                    </ BorderlessButton>
                )}
            >
                {  isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            value={subject}
                            onChangeText={text => setSubject(text)} 
                            style={styles.input}
                            placeholder='Qual a matéria?'
                            placeholderTextColor='#c1bccc'
                        />

                        <View style={styles.inputGroup}>
                            
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da Semana</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={weekDay}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholder='Qual o dia?'
                                    placeholderTextColor='#c1bccc'
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder='Qual o horário?'
                                    placeholderTextColor='#c1bccc'
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleSubmitFilters} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    
                    </View>
                )}
            </ PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    padding: 16
                }}
            >
                {teachers.map( (teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />)
                })}
            </ScrollView>
        </ View> 


    )
}

export default TeacherList;