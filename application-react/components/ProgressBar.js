//Fichier qui sert à mettre en place un component qui permet de faire une barre de progression pour indiquer le nombre de tâches réalisées par rapport au nombre total de tâches.
import React from 'react'
import { View, Text, StyleSheet, ProgressBar, Colors } from 'react-native'
//import { ProgressBar, Colors } from 'react-native-paper';

export default function ProgressBarComponent({count, todos}){
    return (
        <View style={styles.container}>
            <Text style={styles.text}> Nombre de tâches réalisées :</Text>
            <Text style={styles.data}> {count}/{todos.length} ({Math.round(count/todos.length*100)}%)</Text>
            <ProgressBar progress={count/todos.length} style={styles.progressBar} color="#2FA27C"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1CFEBA',
        marginTop: '3em'
    },
    progressBar: {
        width: '80%',
        height: 40,
        borderWidth: 3,
        borderRadius: 8,
        borderColor: '#41463D',
        flexDirection:"row",
    },
    data: {
        color: '#41463D',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '2em',
        position: 'absolute',
        //pour mettre le contenu de data au dessus de tous le reste:
        zIndex: 1
    },
    text: {
        marginTop: '1em',
        color: '#41463D',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

