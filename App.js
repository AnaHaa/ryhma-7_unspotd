
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login'
import MainMenu from './components/MainMenu'
import AddLocation from './components/AddLocation'
import SignUp from './components/SignUp'
import Help from './components/Help'
import LocationMenu from './components/LocationMenu';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login"
          component={Login}
        />
        <Stack.Screen 
          name="Main Menu"
          component={MainMenu}
        />
        <Stack.Screen 
          name="Add Location"
          component={AddLocation}
        />
        <Stack.Screen 
          name="Sign Up"
          component={SignUp}
        />
        <Stack.Screen 
          name="Help"
          component={Help}
        />
        <Stack.Screen 
          name="Location Menu"
          component={LocationMenu}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;