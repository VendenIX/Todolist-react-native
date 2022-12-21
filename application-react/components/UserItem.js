import React, { useState } from "react";
import { Image, View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useEffect } from "react";

export default function UserItem(props) {
    const [done, setDone] = useState(props.item.done);
    return (
        <View style={styles.content}>
            <Text style={styles.text_item}>{props.item.username} qui a le role {props.item.roles[0]}</Text>
            <TouchableOpacity onPress={() => props.deleteUser(props.item.id)}>
                <Image source={require('../assets/trash-can-outline.png')} style = {styles.trash}/>
            </TouchableOpacity>
        </View>
    )

    
}
const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '1em',
        marginBot: '1em',
        marginVertical: '1em',
        gap: '8em',
        width: '98%',
        backgroundColor: '#2FA27C',
        //pour centrer:
        alignItems: 'center',
        borderRadius: '1em'
    },
    text_item: {
        width: '30em',
        marginTop: '1em',
        marginBottom: '1em',
        alignItems: 'center',
        color: '#fff',
        fontSize: '1.5em', 
        fontFamily: 'helvetica',
        marginLeft: '1em',
    },
    trash: {
        marginTop: '1em',
        marginBottom: '1em',
        width: '2em',
        height: '2em', 
        marginLeft: 'auto',
    }
});
