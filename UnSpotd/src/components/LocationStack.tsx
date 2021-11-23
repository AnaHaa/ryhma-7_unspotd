import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Route} from '../interfaces';

// Import views
import LocationMenu from './LocationMenu';
import ModifyLocation from './ModifyLocation';

// Create the navigation module
const Stack = createNativeStackNavigator();

function LocationStack({route}: { route: Route }) {
  // Fetch route information
  const userObject = route.params.userInformation;

  return (
    <Stack.Navigator
      initialRouteName="LocationMenu"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="LocationMenu"
        component={LocationMenu}
        initialParams={{
          userInformation: userObject,
        }}
        options={{title: 'LocationMenu'}}
      />
      <Stack.Screen
        name="ModifyLocation"
        component={ModifyLocation}
        options={{title: 'ModifyLocation'}}
      />
    </Stack.Navigator>
  );
}

export default LocationStack;
