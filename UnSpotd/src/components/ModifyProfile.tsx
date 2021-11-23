import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import HttpModule from '../httpModule';
import {Route, Navigation} from '../interfaces';

const ModifyLocation = ({route, navigation}: { route: Route, navigation: Navigation }) => {
  // Set up HttpModule for API connection
  const httpService = new HttpModule;

  // Fetch route information
  const userObject = route.params.userInformation;
  const userName = userObject.userName;

  // Get all data from route variables
  const [name, setName] = useState(userObject.name);
  const [country, setCountry] = useState(userObject.country);
  const [passwordHash, setPasswordHash] = useState(userObject.profilePic);

  async function handleUserModify() {
    try {
      if (name && country && userName && passwordHash) {
        const upsertResponse = await httpService.upsertUser({
          name, country, userName, passwordHash,
        });

        if (upsertResponse === 'User upsert!') {
          const response = await httpService.login({
            userName, passwordHash,
          });

          navigation.navigate('Profile', {
            userInformation: response,
          });
        } else {
          Alert.alert('User modify failed', 'Something went wrong...');
        }
      }
    } catch (error) {
      Alert.alert('User modify failed', 'Something went wrong...');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Ionicons name="create-outline" size={50} color="white" />
        &nbsp;{userName}
      </Text>
      <LinearGradient
        colors={['#080808', '#082c6c']}
        style={styles.linearGradient}
        start={{x: 0.5, y: 0.7}}
      >
        <TextInput
          style={styles.input}
          placeholder={name}
          placeholderTextColor='white'
          onChangeText={(event) => setName(event)}
        />
        <TextInput
          style={styles.input}
          placeholder={country}
          placeholderTextColor='white'
          onChangeText={(event) => setCountry(event)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          placeholderTextColor='grey'
          secureTextEntry={true}
          onChangeText={(event) => setPasswordHash(event)}
        />
        <View style={styles.confirmButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleUserModify()}
          >
            <Text style={styles.buttonText}>Modify</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  radioButton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 50,
    width: '80%',
    marginBottom: 40,

  },
  radioButtonText: {
    fontSize: 35,
    marginLeft: 20,
    color: 'white',
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
    width: '80%',
  },
  commentInput: {
    height: 120,
    marginBottom: 40,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    fontSize: 20,
    backgroundColor: '#444444',
    borderColor: '#878683',
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  linearGradient: {
    marginTop: 40,
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  header: {
    padding: 5,
    fontSize: 50,
    color: 'white',
    alignSelf: 'center',
    marginTop: 100,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#2069e0',
    marginRight: '10%',
    width: '45%',
  },
  confirmButtons: {
    width: '80%',
    flexDirection: 'row',
  },
});

export default ModifyLocation;
