import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, TextInput, Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import HttpModule from '../src/httpModule';

const MainMenu = ({route, navigation}: { route: any, navigation: any }) => {
  const visitService = new HttpModule;
  const userObject = route.params.userInformation;
  const [userLocations, setUserLocations] = useState([]);

  useEffect(() => {
    async function fetchUserLocations() {
      try {
        console.log(userObject._id);
        const userLocations = await visitService.getUserLocations(userObject._id);
        setUserLocations(userLocations);
      } catch (e) {
        Alert.alert('Failed to get locations.');
      }
    }

    fetchUserLocations();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#080808', '#082c6c']}
        style={styles.linearGradient}
        start={{x: 0, y: 0.7}}
      >
        <Image
          style={styles.fillImage}
          source={require('../assets/maps.png')}
        >
        </Image>
        <View style={styles.topSearch}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="grey"
            keyboardType="default"
          />
          <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('Location menu', {
            userInformation: userObject,
            userLocations: userLocations,
          })}>
            <Ionicons name="menu-outline" size={40} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add Location', {
          userInformation: userObject,
        })}>
          <Ionicons name="add-outline" size={40} color="white" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    padding: 5,
    fontSize: 50,
    color: 'white',
    alignSelf: 'center',
    marginTop: 100,
  },
  linearGradient: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    marginBottom: 40,
    padding: 10,
    fontSize: 20,
    color: 'white',
    width: '80%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#2069e0',
  },
  fillImage: {
    width: '120%',
    height: '120%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  topSearch: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 40,
  },
  menu: {
    marginLeft: '10%',
    width: 40,
    height: 40,
    backgroundColor: '#2069e0',
    borderRadius: 5,
    alignItems: 'center',

  },
  input: {
    height: 40,
    marginBottom: 40,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    fontSize: 20,
    backgroundColor: '#444444',
    borderColor: '#878683',
    borderRadius: 5,
    alignItems: 'center',
    width: '70%',
  },
  addButton: {
    marginLeft: '80%',
    marginTop: '170%',
    width: 40,
    height: 40,
    backgroundColor: '#2069e0',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default MainMenu;
