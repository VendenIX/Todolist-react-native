import React, { useState } from 'react'
import { View, Text,StyleSheet,FlatList } from 'react-native'
import { deleteUser, getUsers } from '../API/todoAPI';
import { TokenContext } from '../Context/Context';
import UserItem from './UserItem'
export default function UserListComponent(){
    const [userList,setUserList] = useState([]);
    const token = React.useContext(TokenContext);
    getUsersList();

    function getUsersList(){
        getUsers(token[0]).then(value =>{
            if (JSON.stringify(value) != JSON.stringify(userList)) {
                setUserList(value);
            }
            return value;
        })
    }

    const deleteUserById = (id) => {
        deleteUser(id,token[0]).then(value => {
            getUsersList()});
    }
    return (
        //ajout d'un style pour dire qu'il prend toute la page
        <View style={styles.container}>
            <Text>Liste des users</Text>
            <View style={styles.inputContainer}>
                <FlatList
                style={styles.list}
                data={userList}
                renderItem={({item}) => <UserItem item={item} deleteUser={deleteUserById}/>}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1CFEBA',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100em'
    },
    list: {
        width: '80%',
        marginTop: '2%',
        marginBottom: '3%'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    },
});

// j'ai une erreur quand je met le style sur le view, je sais pas pourquoi:
// Error: Invariant Violation: View config not found for name container. Make sure to start component names with a capital letter.
