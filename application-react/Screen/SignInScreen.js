import React from 'react'
import { View, Text, Button } from 'react-native'
import { Link } from '@react-navigation/native'

import SignIn from '../components/SignIn'

export default function SignInScreen () {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1CFEBA'
      }}
    >
      <SignIn/>
      <Text>
        Vous pouvez aussi vous inscrire{' '}
        <Link
          style={{ textDecorationLine: 'underline' }}
          to={{ screen: "S'enregistrer" }}
        >
          S'inscrire
        </Link>
      </Text>
    </View>
  )
}
