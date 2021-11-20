import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import HttpModule from '../src/httpModule';

const AddLocation = ({route, navigation}: { route: any, navigation: any }) => {
  const userObject = route.params.userInformation;
  const UserId: string = userObject._id;
  const [name, setName] = useState('');
  const [dateCreated, setDateCreated] = useState((new Date()).toLocaleDateString());
  const [visited, setVisited] = useState(false);
  const [coordinates, setCoordinates] = useState({lat: '', lon: ''});
  const [category, setCategory] = useState('');
  const locationService = new HttpModule;

  async function handleCreateLocation() {
    try {
      const response = await locationService.upsertLocation({
        UserId, name, dateCreated, visited, coordinates, category,
      });

      console.log(response);

      setName('');
      setDateCreated('');
      setVisited(false);
      setCategory('');
      setCoordinates({lat: '', lon: ''});

      navigation.navigate('Main Menu', {
        userInformation: userObject,
      });
    } catch (error) {
      Alert.alert('Location creation failed', 'Something went wrong...');
    }
  }

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
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
              },
            }}
            onValueChange={(value) => setCategory(value)}
            items={[
              {label: 'Nature', value: 'Nature'},
              {label: 'Towns and cities', value: 'Towns and cities'},
              {label: 'Cultural and heritage', value: 'Cultural and heritage'},
            ]}
          />
        </View>
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
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Main Menu', {
              userInformation: userObject,
            })}
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
