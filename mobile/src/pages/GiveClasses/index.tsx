import React from 'react';
import { View,  Text, ImageBackground } from 'react-native';

import styles from './styles';
import giveClassesBg from '../../assets/images/give-classes-background.png'
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GiveClasses(){
    const { goBack } = useNavigation();

    function navigateBack(){
        goBack();
    }
    
    return(
        <View style={styles.container}>
            <ImageBackground 
                resizeMode="contain" 
                source={giveClassesBg} 
                style={styles.content}
            >
                <Text style={styles.title}>Quer ser um Proffy?</Text>
                <Text style={styles.description}>
                    Para começar voçê precisa se cadastrar como professor em nossa plataforma
                </Text>
            </ImageBackground>
            <RectButton onPress={navigateBack} style={styles.okButton}>
                <Text style={styles.okButtonText}> Tudo Bem </Text>
            </RectButton>

        </ View> 


    )
}

export default GiveClasses;