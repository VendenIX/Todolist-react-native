import React, { useState } from 'react'
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

import { getRoles, signIn } from '../API/todoAPI'

import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'
import { UserIsAdminContext } from '../Context/Context'

export default function SignIn () {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(true)

  const getSignedIn = (setToken, setUsername, setIsAdmin) => {
    setError('')
    if (login == '' || password == '') return
    setVisible(false)
    signIn(login, password)
      .then(token => {
        setUsername(login)
        setToken(token)
        getRoles(login,token).then(roleList => {
          if (roleList.indexOf("admin") > -1) {
            setIsAdmin(true)
          } else {
            setIsAdmin(false)
          }
        })
      })
      .catch(err => {
        setError(err.message)
      })
    setVisible(true)
  }

  return (
    <UserIsAdminContext.Consumer>
      {([isAdmin,setIsAdmin]) => (
        <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
            {([username, setUsername]) => {
              return (
                <View>
                  {visible ? (
                    <>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.label}>Login</Text>
                        <TextInput
                          style={styles.text_input}
                          onChangeText={setLogin}
                          onSubmitEditing={() =>
                            getSignedIn(setToken, setUsername,setIsAdmin)
                          }
                          value={login}
                        />
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                          style={styles.text_input}
                          onChangeText={setPassword}
                          secureTextEntry={true}
                          onSubmitEditing={() =>
                            getSignedIn(setToken, setUsername, setIsAdmin)
                          }
                          value={password}
                        />
                      </View>
                      <Button
                        onPress={() => getSignedIn(setToken, setUsername,setIsAdmin)}
                        title='Se connecter'
                        color = '#2FA27C'
                      />
                      {error ? (
                        <Text style={styles.text_error}>{error}</Text>
                      ) : (
                        []
                      )}
                    </>
                  ) : (
                    <ActivityIndicator />
                  )}
                </View>
              )
            }}
          </UsernameContext.Consumer>
        )}
      </TokenContext.Consumer>
      )}
    
    </UserIsAdminContext.Consumer>
  )
}

const styles = StyleSheet.create({
  label: {
    width: 70
  },
  text_error: {
    color: 'red'
  },
  text_input: {
    //borderWidth: 1,
    backgroundColor: 'white',
    margin: 5
  }
})
