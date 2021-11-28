import React from 'react';
import {Platform, View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {Route, Navigation} from '../interfaces';

const Profile = ({route, navigation}: { route: Route, navigation: Navigation }) => {
  // Fetch all user information
  const userObject = route.params.userInformation;
  const userName = userObject.userName;
  const name = userObject.name;
  const country = userObject.country;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#080808', '#082c6c']}
        style={styles.linearGradient}
        start={Platform.OS === 'ios' ? {x: 0.5, y: 0.7} : {x: 0, y: 0.5}}
      >
        <Text style={styles.header}>
          <Ionicons name="person-circle-outline" size={160} color={'white'} />
        </Text>
        <View style={styles.inputIcon}>
          <Ionicons name="mail-outline" style={{marginLeft: 20}} size={35} color={'white'} />
          <TextInput
            style={styles.input}
            placeholder={userName}
            placeholderTextColor="white"
            editable={false}
          />
        </View>
        <View style={styles.inputIcon}>
          <Ionicons name="person-outline" style={{marginLeft: 20}} size={35} color={'white'} />
          <TextInput
            style={styles.input}
            placeholder={name}
            placeholderTextColor="white"
            editable={false}
          />
        </View>
        <View style={styles.inputIcon}>
          <Ionicons name="flag-outline" style={{marginLeft: 20}} size={35} color={'white'} />
          <TextInput
            style={styles.input}
            placeholder={country}
            placeholderTextColor="white"
            editable={false}
          />
        </View>
        <Pressable
          style={styles.buttonEdit}
          onPress={() => {
            navigation.navigate('ModifyProfile', {
              userInformation: userObject,
            });
          }}
        >
          <Ionicons name="create-outline" size={30} color="white" />
        </Pressable>
      </LinearGradient>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonEdit: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2069e0',
    marginRight: 20,
    marginBottom: 20,
    marginTop: 'auto',
    marginLeft: 'auto',
  },
  input: {
    height: 40,
    padding: 10,
    color: 'white',
    fontSize: 20,
  },
  inputIcon: {
    marginBottom: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderColor: '#878683',
  },
  linearGradient: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 80,
    marginBottom: 25,
    padding: 5,
    fontSize: 50,
    color: 'white',
    alignSelf: 'center',
  },
});

export default Profile;
