import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import MainMenu from './components/MainMenu';
import AddLocation from './components/AddLocation';
import LocationMenu from './components/LocationMenu';
import SignUp from './components/SignUp';
import Help from './components/Help';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign Up">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, title: '' }}/>
        <Stack.Screen name="Main Menu" component={MainMenu} options={{ headerShown: false, title: '' }}/>
        <Stack.Screen name="Add Location" component={AddLocation} options={{ headerShown: false, title: '' }}/>
        <Stack.Screen name="Location menu" component={LocationMenu}/>
        <Stack.Screen name="Sign Up" component={SignUp} options={{ headerShown: false, title: '' }}/>
        <Stack.Screen name="Help" component={Help} options={{ headerShown: false, title: '' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
