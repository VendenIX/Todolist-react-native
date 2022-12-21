import React, { useState } from "react";
import { Image, View, Text,TextInput, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useEffect } from "react";

export default function TodoItem(props) {

    const [done, setDone] = useState(props.item.done);
    const [edit, setEdit] = useState(false);
    
    const onSubmitEditing = (value) => {
        props.editTodoTitle(props.item.id,value);
        setEdit(false);
    }

    const [text, setText] = useState(props.item.title);

    //faire en sorte que quand je fais checkAll dans TODOLIST, ça change le state de done dans TODOITEM: 
    useEffect(() => {
        setDone(props.item.done);
    }, [props.item.done]);
    return (
        
        <View style={styles.content}>
            <Switch value={done} onValueChange={(state) => {setDone(state); props.updateCountItemDone(props.item.id,props.item.title,state)}} style={styles.switch}/>
            {edit ? <TextInput onLongPress={console.log("")} style={styles.text_item} value={text} onSubmitEditing={(value) => onSubmitEditing(value.nativeEvent.text)} onChangeText={(text) => setText(text)}/> : <Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>{props.item.title}</Text>}
            <TouchableOpacity onPress={() => {setEdit(!edit); if(edit){onSubmitEditing(text)}}}>
                <Image source={edit ? require('../assets/edit_button_red.png') : require('../assets/edit_button_white.png')} style={styles.icons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.deleteTodo(props.item.id)}>
                <Image source={require('../assets/trash-can-outline.png')} style={styles.icons} />
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
        fontFamily: 'helvetica'
    },
    switch: {
        transform: [{ scaleX: '2px' }, { scaleY: '2' }],
        marginTop: '1em',
        marginBottom: '1em',
        marginLeft: '1em',
        width : '1em'
    },
    icons: {
        marginTop: '1em',
        marginBottom: '1em',
        width: '2em',
        height: '2em', 
        marginLeft: 'auto',
    }
});
