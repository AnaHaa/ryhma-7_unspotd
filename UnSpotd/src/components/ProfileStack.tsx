import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Route} from '../interfaces';

// Import views
import Profile from './Profile';
import ModifyProfile from './ModifyProfile';

// Create the navigation module
const Stack = createNativeStackNavigator();

function ProfileStack({route}: { route: Route }) {
  // Fetch route information
  const userObject = route.params.userInformation;

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        initialParams={{
          userInformation: userObject,
        }}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name="ModifyProfile"
        component={ModifyProfile}
        options={{title: 'ModifyProfile'}}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
