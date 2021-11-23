import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/components/Login';
import MainMenu from './src/components/MainMenu';
import SignUp from './src/components/SignUp';
import Terms from './src/components/Terms';

// Create the navigation module
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign Up">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false, title: ''}} />
        <Stack.Screen name="Main Menu" component={MainMenu} options={{headerShown: false, title: ''}} />
        <Stack.Screen name="Sign Up" component={SignUp} options={{headerShown: false, title: ''}} />
        <Stack.Screen name="Terms" component={Terms} options={{headerShown: false, title: ''}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
