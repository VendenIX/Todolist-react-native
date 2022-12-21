import React from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch, ImageBackground } from 'react-native';
import { useEffect } from "react";
import todoData from '../Helpers/todoData';
import TodoItem from './TodoItem';
import ProgressBar from './ProgressBar';
import { createTask, deleteTask, getTasks, updateTask, updateTaskUsername } from "../API/todoAPI";
import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'
import { Background } from "@react-navigation/elements";


export default function TodoList(){
    const token = React.useContext(TokenContext);
    const username = React.useContext(UsernameContext);
    const [newTodoText, setNewTodoText] = React.useState('');
    const [todos, setTodos] = React.useState([]);
    const [count, setCount] = React.useState(todos.filter((item) => item.done).length);
    const [view, setView] = React.useState(todos);
    getData();

    //pour palier à mon problème quand je delete un item déjà checké le count se mettait pas à jour
    useEffect(() => {
        setCount(todos.filter((item) => item.done).length); //je filtre les items qui sont done et je compte le nombre d'items qui sont done
    }, [todos]);

    //quand je clique sur le bouton afficher les items done, cela enleve tous les items  car le filter renvoie un tableau vide ? 
    //Comment savoir si le filtre renvoie un tableau vide ou pas ?
    

    // Met à jour avec la base de données la vue
    function getData() {
        getTasks(username[0],token[0]).then( value =>{
            if (JSON.stringify(value) != JSON.stringify(todos)) {
                setTodos(value);
                setView(value);
            }
            return value;
        }).then( value =>{
            setCount(value.filter((item) => item.done).length)
        })
    }

    const showDone = () => {
        setView(todos.filter((item) => item.done));
    }

    const showNotDone = () => {
        setView(todos.filter((item) => !item.done));
    }

    const showAll = () => {
        setView(todos);
    }

    const updateCountItemDone = (id,title,done) => {
        updateTask(id,title,done,token[0]).then(value => {
            getData()});
    }
    
    const deleteTodo = (id) => {
        deleteTask(id,token[0]).then(value => {
            getData()});
    }

    const editTodoTitle = (id, text) => {
        updateTask(id,text,false,token[0]).then(value => {
            getData()});
        //pour remettre le edit à false
        setTodos(todos.map((item) => {
            if (item.id == id) {
                item.edit = false;
            }
            return item;
        }
        ));
        //reactualiser la vue
        setView(todos);
    }

    const addNewTodo = () => {
        createTask(newTodoText,false,username[0],token[0]).then(value =>
            {
                getData();
                setNewTodoText('');
            });
    }

    const checkAll = () => {
        updateTaskUsername(username[0],true,token[0]).then(value => {
            getData()});
    }

    const unCheckAll = () => {
        updateTaskUsername(username[0],false,token[0]).then(value => {
            getData()});
    }
    
    return (
            <TokenContext.Consumer>
                {([token,setToken]) => (
                    <UsernameContext.Consumer>
                        {([username,setUsername]) => {
                            return (
                                //Pour ajouter a cette page le css container, je dois mettre le css dans un View:
                                // <View style={styles.container}>
                                <View style={styles.container}>

                                    <ProgressBar count={count} todos={todos}/>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            onChangeText={setNewTodoText}
                                            placeholder='saisir ici un nouvel item'
                                            onSubmitEditing={addNewTodo}
                                            value={newTodoText}
                                        />
                                        <Button title="Ajouter" onPress={addNewTodo} color='#2FA27C'/>
                                    </View>
                                    <FlatList
                                        style={styles.list}
                                        data={view} //il ne faut pas mettre todoData mais todos car on a mis à jour le state
                                        renderItem={({item}) => <TodoItem item={item} updateCountItemDone={updateCountItemDone} deleteTodo={deleteTodo} editTodoTitle={editTodoTitle}/>}
                                    />
                                    
                                        <View style={styles.buttonsOptions}>
                                            <Button title='Check all' onPress={checkAll} color='#2FA27C'/>
                                            <Button title='UnCheck all' onPress={unCheckAll} color='#2FA27C'/>
                                            <Button title='Tâches en cours' onPress={showNotDone} color='#2FA27C'/>
                                            <Button title='Tâches réalisées' onPress={showDone} color='#2FA27C'/>
                                            <Button title='Toutes les tâches' onPress={showAll} color='#2FA27C'/>
                                        </View>

                                </View>
                            )
                        }
                        }
                    </UsernameContext.Consumer>
                )    
                }
            </TokenContext.Consumer>
    )
}

//petit css pour rendre le tout plus joli

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1CFEBA',
        alignItems: 'center',
        justifyContent: 'center',
        //la page est trop petite, je veux qu'elle prenne toute la place de l'écran:
        height: '100em',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    },
    buttonsOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        //j'veux faire en sorte que les boutons soient affichés tout en bas de la page:
        position: 'absolute',
        bottom: 0,
        marginTop: '70%',
        //pour que les boutons aient tous la meme taille:
        flex: 1, 

    },
    list: {
        width: '80%',
        marginTop: '2%',
        marginBottom: '3%'
    }
});

//Pour changer le style des boutons react:
//https://reactnative.dev/docs/button

