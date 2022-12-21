import React from 'react'
import { View, Text } from 'react-native'

import { UsernameContext } from '../Context/Context'
import { UserIsAdminContext } from '../Context/Context'

export default function HomeScreen () {
  return (
    <UserIsAdminContext.Consumer>
      {([isAdmin,setIsAdmin]) => (
        <UsernameContext.Consumer>
        {([username, setUsername]) => {
          return (
            <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1CFEBA' }}
            >
              <Text>Bienvenido ahah !</Text>
              <Text>Vous êtes connecté en tant que {username}</Text>
              {
                isAdmin ? <Text>Vous avez le rôle admin</Text> : <Text></Text>
              }
            </View>
          )
        }}
      </UsernameContext.Consumer>
      )}
    </UserIsAdminContext.Consumer>
  )
}
