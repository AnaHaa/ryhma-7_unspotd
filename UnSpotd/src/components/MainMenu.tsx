
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {Route, User} from '../interfaces';

import ProfileStack from './ProfileStack';
import LocationStack from './LocationStack';
import AddLocation from './AddLocation';

// Create new tab navigation for Main Menu
const Tab = createBottomTabNavigator();

const MainMenu = ({route}: { route: Route }) => {
  // Fetch route information
  const userObject = route.params.userInformation;

  // Get User object from route
  const userInformation: User | null = userObject ? userObject : null;

  return (
    <Tab.Navigator
      initialRouteName="LocationStack"
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: '#222222',
          borderColor: '#222222',
          borderTopColor: 'transparent',
        },
        tabBarIcon: ({focused, color, size}) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let iconName: any;

          if (route.name === 'ProfileStack') {
            iconName = focused ?
              'person-outline' :
              'person-circle-outline';
          } else if (route.name === 'LocationStack') {
            iconName = focused ?
            'list-outline' :
            'list-circle-outline';
          } else if (route.name === 'AddLocation') {
            iconName = focused ?
            'add-outline' :
            'add-circle-outline';
          }

          // Return icon for each tab navigation button
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2069e0',
        tabBarInactiveTintColor: 'white',
      })}>
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        initialParams={{
          userInformation: userInformation,
        }}
        options={{
          tabBarLabel: 'ProfileStack',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="LocationStack"
        component={LocationStack}
        initialParams={{
          userInformation: userInformation,
        }}
        options={{
          tabBarLabel: 'LocationStack',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AddLocation"
        component={AddLocation}
        initialParams={{
          userInformation: userInformation,
        }}
        options={{
          tabBarLabel: 'Add location',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainMenu;
