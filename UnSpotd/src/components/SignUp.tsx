import React, {useState, useEffect} from 'react';
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

const SignUp = ({navigation}: { navigation: Navigation }) => {
  // Set up HttpModule for API connection
  const httpService = new HttpModule;

  // Store user information in device safely
  const storeData = async (value: User) => {
    try {
      await AsyncStorage.setItem('@userInformation', JSON.stringify(value));
      console.log('Stored user information');
    } catch (e) {
      Alert.alert('Data storing failed!', 'Non-critical error');
    }
  };

  // Fetch user information and check if it exists
  const getData = async () => {
    try {
      const storeduserInformation = await AsyncStorage.getItem('@userInformation');

      // If user information exists return it
      if (storeduserInformation !== null) {
        console.log('Returned user information');
        return storeduserInformation;
      } else {
        return null;
      }
    } catch (e) {
      console.log('No user information');
    }
  };

  // Run on start up
  useEffect(() => {
    // Check if user has already logged in
    // and log in if user information is available
    // and proceed to Main Menu - view
    async function fetchUserInformation() {
      try {
        const userData: string | null | undefined = await getData();

        // Check that userData is valid
        if (userData && userData !== null) {
          // Parse JSON to object and log in
          const {userName, passwordHash} = JSON.parse(userData);
          const userObject = await httpService.login({
            userName, passwordHash,
          });

          // Navigate to Main menu and send user object
          // back for usage
          navigation.navigate('Main Menu', {
            userInformation: userObject,
          });
        }
      } catch (e) {
        // Alert error if something went wrong with login
        Alert.alert('Failed to log in.');
      }
    }

    // Run the function
    fetchUserInformation();
  }, []);

  // Set all fields
  const [userName, setUsername] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [name, setName] = useState('');

  // Handle the creation of a new User
  async function handleCreateUser() {
    try {
      // Check that the input are valid
      if (userName.length < 5 || passwordHash.length < 8 || !userName.includes('@') || !userName.includes('.')) {
        Alert.alert('Email or password invalid', 'Email should be atleast 5 characters or password 8 characters');
      } else {
        // Use HttpModule to create new user
        await httpService.createUser({
          name, userName, passwordHash,
        });

        // Use HttpModule to log in the new user
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
        setName('');

        // Navigate to Main menu and send user object
        // back for usage
        navigation.navigate('Main Menu', {
          userInformation: userObject,
        });
      }

      // Incase of failure to proceed alert
      Alert.alert('Account creation failed', 'Something went wrong...');
    } catch (error) {
      // Catch and alert incase of error
      Alert.alert('Account creation failed', 'Something went wrong...');
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
          maxLength={26}
          style={styles.input}
          placeholder="Name (Optional)"
          placeholderTextColor="grey"
          keyboardType="default"
          onChangeText={(event) => setName(event)}
          value={name}
        />
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
            By clicking Sign Up, you agree to our
            <Text
              style={styles.textButtonText}
            >
              &nbsp;terms and conditions
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateUser}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textButtonLogin}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.textButtonText}>Already an user? Log In</Text>
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
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
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
    marginBottom: 40,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#2069e0',
  },
  textButtonLogin: {
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

export default SignUp;
