const API_URL = 'http://127.0.0.1:4000/'
const SIGN_IN =
  'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP =
  'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

const ALL_TASK = 'query($username:String!){tasks(where:{owner:{username:$username}}){id title done}}'
const CREATE_TASK = 'mutation create_task($title: String!, $done: Boolean!, $owner: String) { createTasks( input: { title: $title, done: $done, owner: { connect: { where: { username: $owner } } }}) { tasks {id title done owner {username}}}}';
const DELETE_TASK = 'mutation delete_task($id : ID) {deleteTasks(where: { id: $id }) {nodesDeleted}}';
const UPDATE_TASK = 'mutation update_task($id: ID, $title: String, $done: Boolean) { updateTasks(where:{id:$id} update:{title:$title , done: $done}) { tasks { id title done owner {id}}}}';
const UPDATE_TASK_USER = 'mutation update_task($username: String!, $done: Boolean) { updateTasks(where:{owner:{username: $username}} update:{done: $done}) { tasks { id title done owner {id}}}}';
const GET_ROLES = 'query($username:String!){users(where:{username:$username}){roles}}';
const ALL_USERS = 'query{users{username id roles}}';
const DELETE_USER = 'mutation delete_user($id: ID) {deleteUsers(where: { id: $id }) {nodesDeleted}}';
const CREATE_USER = 'mutation create_user($username: String!, $password: String!) { createUsers( input: { username: $username password: $password roles: "user" }) {users {username id}}}';
//le create user est pas bon car il ne met pas le role user, nouvelle version:
export function signIn (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signIn
    })
    .catch(error => {
      throw error
    })
}

export function signUp (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_UP,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signUp
    })
    .catch(error => {
      throw error
    })
}

export function getTasks(username,token){
  return fetch(API_URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "authorization": "Bearer "+ token
    },
    body: JSON.stringify({
      query: ALL_TASK,
      variables: {
        username: username
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.tasks
  })
  .catch(error => {
    throw error
  })
}

export function getRoles(username,token){
  return fetch(API_URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "authorization": "Bearer "+ token
    },
    body: JSON.stringify({
      query: GET_ROLES,
      variables: {
        username: username
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.users[0].roles
  })
  .catch(error => {
    throw error
  })
}

export function createTask(title,done,owner,token){
  return fetch(API_URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "authorization": "Bearer "+ token
    },
    body: JSON.stringify({
      query: CREATE_TASK,
      variables: {
        title: title,
        done: done,
        owner: owner
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.tasks
  })
  .catch(error => {
    throw error
  })
}

export function deleteTask(id,token){
  return fetch(API_URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "authorization": "Bearer "+ token
    },
    body: JSON.stringify({
      query: DELETE_TASK,
      variables: {
        id: id
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.tasks
  })
  .catch(error => {
    throw error
  })
}

export function updateTask(id,title,done,token){
  return fetch(API_URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "authorization": "Bearer "+ token
    },
    body: JSON.stringify({
      query: UPDATE_TASK,
      variables: {
        id: id,
        title: title,
        done: done
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.tasks
  })
  .catch(error => {
    throw error
  })
}

export function updateTaskUsername(username,done,token){
  return fetch(API_URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "authorization": "Bearer "+ token
    },
    body: JSON.stringify({
      query: UPDATE_TASK_USER,
      variables: {
        username:username,
        done: done
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.tasks
  })
  .catch(error => {
    throw error
  })
}

export function getUsers(token){
  return fetch(API_URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "authorization": "Bearer "+ token
    },
    body: JSON.stringify({
      query: ALL_USERS,
      variables: {
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.users
  })
  .catch(error => {
    throw error
  })
}

export function deleteUser(id,token){
  return fetch(API_URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "authorization": "Bearer "+ token
    },
    body: JSON.stringify({
      query: DELETE_USER,
      variables: {
        id: id
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.users
  })
  .catch(error => {
    throw error
  })
}

export function createUser(username,password,token){
  return fetch(API_URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "authorization": "Bearer "+ token
    },
    body: JSON.stringify({
      query: CREATE_USER,
      variables: {
        username: username,
        password: password
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.users
  })
  .catch(error => {
    throw error
  })
}
