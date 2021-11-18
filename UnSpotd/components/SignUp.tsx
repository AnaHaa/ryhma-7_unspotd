import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import HttpModule from '../src/httpModule';

const SignUp = ({ navigation }: { navigation: any }) => {
  const userService = new HttpModule;
  const [userName, setUsername] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [name, setName] = useState('');

  async function handleCreateUser() {
    try {
      const userObject = await userService.createUser({
        name, userName, passwordHash
      });

      setUsername('');
      setPasswordHash('');
      setName('');

      navigation.navigate("Main Menu", {
        userInformation: userObject
      });
    } catch (error) {
      Alert.alert("Account creation failed", "Username already in use.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Ionicons name="location-sharp" size={50} color="white" />
        UnSpotd
      </Text>
      <LinearGradient
        colors={['#080808', '#082c6c']}
        style={styles.linearGradient}
        start={{ x: 0, y: 0.7 }}
      >
        <TextInput
          style={styles.input}
          placeholder="Name (Optional)"
          placeholderTextColor="grey"
          keyboardType="default"
          onChangeText={(event) => setName(event)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="grey"
          keyboardType="email-address"
          onChangeText={(event) => setUsername(event)}
          value={userName}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="grey"
          keyboardType="visible-password"
          onChangeText={(event) => setPasswordHash(event)}
          value={passwordHash}
        />
        <TouchableOpacity
          style={styles.textButtonTCH}
          onPress={() => navigation.navigate("Help")}
        >
          <Text style={styles.buttonText}>By clicking Sign Up, you agree to our <Text style={styles.textButtonText}>terms and conditions</Text></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateUser}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textButtonLogin}
          onPress={() => navigation.navigate("Login")}
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
    backgroundColor: 'black'
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
  textHeader: {
    padding: 10,
    fontSize: 20,
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
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
    marginTop: 100
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
    color: '#2069e0'
  },
  textButtonTCH: {
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    color: '#2069e0',
    marginBottom: 40,
  },
})

export default SignUp;
