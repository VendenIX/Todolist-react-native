import React from 'react'
import { View, Text, Button } from 'react-native'
import TodoList from '../components/TodoList'
export default function TodoLists(){
    return (
        //ajout d'un style pour dire qu'il prend toute la page
        <View style={{flex:1}}>
            <TodoList/>
        </View>
    )
}
