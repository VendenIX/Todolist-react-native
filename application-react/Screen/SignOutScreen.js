import React from 'react'
import { View, Text, Button } from 'react-native'

import { TokenContext, UserIsAdminContext } from '../Context/Context'

export default function SignOut ({ navigation }) {
  return (
    <UserIsAdminContext.Consumer>
      {([isAdmin,setIsAdmin]) => (
        <TokenContext.Consumer>
        {([token, setToken]) => (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1CFEBA'
          }}>
            <Text>Tu nous quittes déjà ? A la prochaine !</Text>
            <Button title='Se déconnecter' onPress={() => {setToken(null); setIsAdmin(false)}} color="#2FA27C"/>
          </View>
        )}
      </TokenContext.Consumer>
      )}
    
    </UserIsAdminContext.Consumer>
  )
}
