import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import HttpModule from '../httpModule';
import {Navigation, User} from '../interfaces';

const Login = ({navigation}: { navigation: Navigation }) => {
  // Set up HttpModule for API connection
  const httpService = new HttpModule;

  // Store user information in device safely
  const storeData = async (value: User) => {
    try {
      await AsyncStorage.setItem('@userInformation', JSON.stringify(value));
      console.log('Stored user information');
    } catch (e) {
      Alert.alert('Account creation failed', 'Failed to store user information.');
    }
  };

  // Set all fields
  const [userName, setUsername] = useState('');
  const [passwordHash, setPasswordHash] = useState('');

  // Handle user login
  async function handleLogin() {
    try {
      // Check that the input are valid
      if (userName.length < 5 || passwordHash.length < 8 || !userName.includes('@') || !userName.includes('.')) {
        Alert.alert('Email or password invalid', 'Email should be atleast 5 characters or password 8 characters');
      } else {
        // Use HttpModule to log in the existing user
        const userObject = await httpService.login({
          userName, passwordHash,
        });

        // Set user information to be stored
        const storedUserObject = {
          userName,
          passwordHash,
        };

        // Store user information on to device
        await storeData(storedUserObject);

        // Clear all fields
        setUsername('');
        setPasswordHash('');

        // Navigate to Main menu and send user object
        // back for usage
        navigation.navigate('Main Menu', {
          userInformation: userObject,
        });
      }
    } catch (error) {
      // Catch and alert incase of error
      Alert.alert('Login failed', 'Username or password was invalid');
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#080808', '#082c6c']}
        style={styles.linearGradient}
        start={{x: 0.5, y: 0.7}}
      >
        <Text style={styles.header}>
          <Ionicons name="location-sharp" size={50} color="white" />
          UnSpotd
        </Text>
        <TextInput
          maxLength={64}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="grey"
          keyboardType="email-address"
          onChangeText={(event) => setUsername(event)}
          value={userName}
        />
        <TextInput
          maxLength={64}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="grey"
          keyboardType="default"
          secureTextEntry={true}
          onChangeText={(event) => setPasswordHash(event)}
          value={passwordHash}
        />
        <TouchableOpacity
          style={styles.textButtonTCH}
          onPress={() => navigation.navigate('Terms')}
        >
          <Text
            style={styles.buttonText}
          >
            By clicking Log In, you agree to our
            <Text
              style={styles.textButtonText}
            >
              &nbsp;terms and conditions
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textButton}
          onPress={() => navigation.navigate('Sign Up')}
        >
          <Text style={styles.textButtonText}>Create an account</Text>
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
  linearGradient: {
    marginTop: 40,
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
  textButtonText: {
    color: '#2069e0',
    fontSize: 15,
  },
  header: {
    padding: 5,
    fontSize: 50,
    color: 'white',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 120,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#2069e0',
  },
  textButton: {
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'flex-end',
    color: '#2069e0',
  },
  textButtonTCH: {
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    color: '#2069e0',
    marginBottom: 40,
  },
});

export default Login;
