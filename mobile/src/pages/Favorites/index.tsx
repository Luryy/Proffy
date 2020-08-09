import React, { useState } from 'react';
import { View,  Text, AsyncStorage } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

function Favorites(){

    const [favorites, setFavorites] = useState([]);

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if (response){
                const favoritedTeachers = JSON.parse(response);
                setFavorites(favoritedTeachers);
            }
        })
    }

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
      )
    
    return(
        <View style={styles.container}>
            <PageHeader title='Meus Proffys Favoritos' />

            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle={{
                    padding: 16
                }}
            >
            {favorites.map((teacher: Teacher) => {
                return(
                    <TeacherItem 
                        key={teacher.id}
                        teacher={teacher}
                        favorited
                    />
                )
            })}
            
            </ScrollView>
        </ View>
    )
}

export default Favorites;