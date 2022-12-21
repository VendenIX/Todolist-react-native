// npm i --save @react-navigation/bottom-tabs @react-navigation/native 

import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TodoListsScreen from '../Screen/TodoListsScreen'
import HomeScreen from '../Screen/HomeScreen'
import SignInScreen from '../Screen/SignInScreen'
import SignUpScreen from '../Screen/SignUpScreen'
import SignOutScreen from '../Screen/SignOutScreen'

import { TokenContext, UserIsAdminContext } from '../Context/Context'
import UserListScreen from '../Screen/UserListScreen'

const Tab = createBottomTabNavigator()
export default function Navigation () {
  return (
    <UserIsAdminContext.Consumer>
    {([isAdmin,setIsAdmin]) => (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <NavigationContainer>
          {token == null ? (
            <Tab.Navigator
            tabBarOptions={{
              activeBackgroundColor: '#21E7AB',
              inactiveBackgroundColor: '#2FA27C',
              activeTintColor: 'white',
              inactiveTintColor: 'white'
            }}
          >
              <Tab.Screen name='Se connecter' component={SignInScreen} 
              options={{
                headerStyle: {
                  backgroundColor: '#21E7AB',
                },
                headerTintColor: 'white',
              }}
              />
              <Tab.Screen name="S'enregistrer" component={SignUpScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#21E7AB',
                },
                headerTintColor: 'white',
              }}
              />
            </Tab.Navigator>
          ) : (
            <Tab.Navigator
            tabBarOptions={{
              activeBackgroundColor: '#21E7AB',
              inactiveBackgroundColor: '#2FA27C',
              activeTintColor: 'white',
              inactiveTintColor: 'white'
            }}
            
            >
              <Tab.Screen name='Accueil' component={HomeScreen} options={{
                              tabBarIcon: () => {
                                //Je voulais vous faire de belles icones adaptatives comme Youtube mais askip c'est relou de devoir installer des librairies pour ca
                                return <Text style={{ color: 'white' }}>🏠</Text>
                              },
                              //pour faire comme pour tabBarOptions et avoir un activeBackgroundColor et un inactiveBackgroundColor pour le header je dois faire:
                               headerStyle: {
                                 backgroundColor: '#21E7AB',
                              },
                              headerTintColor: 'white',
                            }}
                            />
              {isAdmin ? (
              <Tab.Screen name='UserList' component={UserListScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#21E7AB',
                },
                headerTintColor: 'white',
              }}
              />
              ) : (
                <Tab.Screen name='TodoList' component={TodoListsScreen} 
                options={{
                  headerStyle: {
                  backgroundColor: '#21E7AB',
                },
                headerTintColor: 'white',
              }}
              />
              )}

              <Tab.Screen name='Se déconnecter' component={SignOutScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#21E7AB',
                },
                headerTintColor: 'white',
              }}
              />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      )}
      </TokenContext.Consumer>
    )}
    </UserIsAdminContext.Consumer>
  )

}

