import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import HttpModule from '../httpModule';
import {Route} from '../interfaces';

const AddLocation = ({route}: { route: Route }) => {
  // Set up HttpModule for API connection
  const httpService = new HttpModule;

  // Fetch route information
  const userObject = route.params.userInformation;

  // Get all data from route variables and fetch current date
  const UserId = userObject._id ? userObject._id : '';
  const dateCreated = (new Date()).toLocaleDateString();

  // Set editable fields
  const [name, setName] = useState('');
  const [visited, setVisited] = useState(false);
  const [comments, setComments] = useState({comment: ''});
  const [category, setCategory] = useState('');

  // Create location using HttpModule
  async function handleCreateLocation() {
    try {
      // Check if name is valid
      if (name.length < 2) {
        Alert.alert('Location creation failed', 'Name must be atleast 2 characters');
      } else if (userObject._id) {
        const response = await httpService.upsertLocation({
          UserId, name, dateCreated, visited, comments: [comments], category,
        });

        // TODO REMOVE
        console.log(response);

        setName('');
        setVisited(false);
        setCategory('');
        setComments({comment: ''});

        // Navigate to Main menu and send user object
        // back for usage
        Alert.alert('Location created!', 'Location can be found in Locations.');
      }
    } catch (error) {
      // Alert error if something is wrong with API or fields
      Alert.alert('Location creation failed', 'Something went wrong...');
    }
  }

  // Handle radio button boolean
  function handleRadioButton() {
    setVisited(!visited);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Ionicons name="add-circle-outline" size={50} color="white" />
        &nbsp;Location
      </Text>
      <LinearGradient
        colors={['#080808', '#082c6c']}
        style={styles.linearGradient}
        start={{x: 0.5, y: 0.7}}
      >
        <TextInput
          style={styles.input}
          placeholder="Name"
          maxLength={26}
          placeholderTextColor="grey"
          keyboardType="default"
          onChangeText={(event) => setName(event)}
          value={name}
        />
        <View style={styles.pickerInput}>
          <RNPickerSelect
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 20,
                right: 10,
              },
              placeholder: {
                color: 'grey',
                fontSize: 20,
              },
            }}
            onValueChange={(value) => setCategory(value)}
            placeholder={{
            }}
            items={[
              {label: 'Nature', value: 'Nature'},
              {label: 'Towns and cities', value: 'Towns and cities'},
              {label: 'Cultural and heritage', value: 'Cultural and heritage'},
            ]}
          />
        </View>
        <TextInput
          style={styles.commentInput}
          blurOnSubmit={true}
          multiline
          maxLength={80}
          placeholder="Comments"
          placeholderTextColor="grey"
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
            onPress={() => handleCreateLocation()}
          >
            <Text style={styles.buttonText}>Add location</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
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
  pickerInput: {
    height: 40,
    marginBottom: 40,
    borderWidth: 1,
    paddingLeft: 10,
    color: 'white',
    backgroundColor: '#444444',
    borderColor: '#878683',
    borderRadius: 5,
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
    width: '100%',
  },
  confirmButtons: {
    width: '80%',
    flexDirection: 'row',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    color: 'white',
    height: 40,
  },
  inputAndroid: {
    fontSize: 20,
    color: 'white',
    height: 40,
  },
});

export default AddLocation;
