import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import Navigation from './Navigation/Navigation'

import { TokenContext, UserIsAdminContext, UsernameContext } from './Context/Context'

export default function App () {
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState(null)
  const [isAdmin,setIsAdmin] = useState(false)
  return (
    <UserIsAdminContext.Provider value={[isAdmin, setIsAdmin]}>
    <UsernameContext.Provider value={[username, setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
          <Navigation />
      </TokenContext.Provider>
    </UsernameContext.Provider>
    </UserIsAdminContext.Provider>
  )
}

