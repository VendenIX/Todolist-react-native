import React from 'react'
import UserListComponent from '../components/UserListComponent'
import { View, Text, Button } from 'react-native'
export default function UserList(){
    return (
        //ajout d'un style pour dire qu'il prend toute la page
        <View style={{flex:1}}>
            <UserListComponent></UserListComponent>
        </View>
    )
}