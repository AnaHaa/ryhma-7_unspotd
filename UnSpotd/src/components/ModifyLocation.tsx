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
  const locationObject = route.params.locationInformation;

  // Get all data from route variables
  const UserId: string = locationObject.UserId ? locationObject.UserId : '';
  const name = locationObject.name ? locationObject.name : '';
  const dateCreated = locationObject.dateCreated ? locationObject.dateCreated : '';
  const visitVisited = locationObject.visited ? locationObject.visited : false;
  const visitComment = locationObject.comments ? locationObject.comments[0] : {comment: ''};
  const category = locationObject.category ? locationObject.category : '';

  // Set editable fields
  const [visited, setVisited] = useState(visitVisited);
  const [comments, setComments] = useState(visitComment);

  // Upsert location using HttpModule
  async function handleUpsertLocation() {
    try {
      // Check if name and UserId exists
      // for correct visit upserting
      if (name.length || UserId.length) {
        const response = await httpService.upsertLocation({
          UserId, name, dateCreated, visited, comments: [comments], category,
        });

        // TODO REMOVE
        console.log(response);

        setVisited(false);
        setComments({comment: ''});

        // Navigate to LocationMenu and send user object
        // back for usage
        navigation.navigate('LocationMenu');
      }
    } catch (error) {
      // Alert error if something is wrong with API or fields
      Alert.alert('Location modify failed', 'Something went wrong...');
    }
  }

  // Handle radio button boolean
  function handleRadioButton() {
    setVisited(!visited);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Ionicons name="create-outline" size={50} color="white" />
        &nbsp;Location
      </Text>
      <LinearGradient
        colors={['#080808', '#082c6c']}
        style={styles.linearGradient}
        start={{x: 0.5, y: 0.7}}
      >
        <TextInput
          style={styles.input}
          placeholder={name}
          placeholderTextColor='grey'
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder={category}
          placeholderTextColor='grey'
          editable={false}
        />
        <TextInput
          style={styles.commentInput}
          blurOnSubmit={true}
          multiline
          maxLength={80}
          value={comments.comment}
          keyboardType="default"
          onChangeText={(event) => setComments({comment: event})}
        />
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleRadioButton()}
        >
          <Ionicons name={visited ? 'radio-button-on' : 'radio-button-off'} size={40} color="white" />
          <Text style={styles.radioButtonText}>Visited</Text>
        </TouchableOpacity>
        <View style={styles.confirmButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleUpsertLocation()}
          >
            <Text style={styles.buttonText}>Modify</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LocationMenu')}
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
