import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import HttpModule from '../src/httpModule';

const AddLocation = ({route, navigation}: { route: any, navigation: any }) => {
  const userObject = route.params.userInformation;
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [name, setName] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [visited, setVisited] = useState(false);
  const [comments, setComments] = useState([]);
  const [coordinates, setCoordinates] = useState({lat: '', lon: ''});
  const locationService = new HttpModule;

  async function handleCreateLocation() {
    try {
      await locationService.createLocation({
        name, dateCreated, visited, comments, coordinates,
      });

      setName('');
      setDateCreated('');
      setVisited(false);
      setComments([]);
      setCoordinates({lat: '', lon: ''});

      navigation.navigate('Main Menu', {
        userInformation: userObject,
      });
    } catch (error) {
      Alert.alert('Location creation failed', 'Something went wrong...');
    }
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
        start={{x: 0, y: 0.7}}
      >
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="grey"
          keyboardType="default"
          onChangeText={(event) => setName(event)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="grey"
          keyboardType="default"
          onChangeText={(event) => setCoordinates({lat: event, lon: event})}
          value={coordinates.lat}
        />
        <TextInput
          style={styles.input}
          placeholder="Tags"
          placeholderTextColor="grey"
          keyboardType="default"
        />
        <View style={styles.pickerInput}>
          <Picker
            style={styles.picker}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Category" value="1" />
            <Picker.Item label="Category" value="2" />
            <Picker.Item label="Category" value="3" />
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setVisited(true)}
        >
          <Ionicons name="radio-button-off-outline" size={40} color="white" />
          <Text style={styles.radioButtonText}>Visited</Text>
        </TouchableOpacity>
        <View style={styles.confirmButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCreateLocation()}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Main Menu')}
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
  pickerInput: {
    height: 50,
    marginBottom: 40,
    borderWidth: 1,
    backgroundColor: '#444444',
    borderColor: '#878683',
    borderRadius: 5,
    width: '80%',
  },
  picker: {
    height: '100%',
    color: '#878683',
    width: '100%',
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

export default AddLocation;
