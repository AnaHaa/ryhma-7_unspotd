import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TextInput, Text, FlatList, TouchableOpacity, Modal, Pressable, Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import {Navigation, Visit} from '../interfaces/index';
import {Route} from '../interfaces';
import HttpModule from '../httpModule';
import {Ionicons} from '@expo/vector-icons';

const LocationMenu = ({route, navigation}: { route: Route, navigation: Navigation }) => {
  // Fetch route information
  const userObject = route.params.userInformation;

  // Get UserId field from route
  const userId = userObject._id ? userObject._id : '';

  // Set all fields
  const [filteredLocations, setFilteredLocations] = useState<Visit[]>([]);
  const [userLocations, setUserLocations] = useState<Visit[]>([]);
  const [chosenLocation, setChosenLocation] = useState<Visit>();
  const [modalVisible, setModalVisible] = useState(false);

  // Set up HttpModule for API connection
  const httpService = new HttpModule;

  useEffect(() => {
    async function fetchUserLocations() {
      try {
        const userLocations = await httpService.getUserLocations(userId);
        setUserLocations(userLocations);
        setFilteredLocations(userLocations);
      } catch (e) {
        setUserLocations([]);
      }
    }

    fetchUserLocations().then(function() {
      console.log('Refreshed');
    });
  }, [modalVisible]);

  // If view is changed
  // update all user locations
  useFocusEffect(
      React.useCallback(() => {
        let isActive = true;
        // Fetch user locations
        async function fetchUserLocations() {
          try {
            const userLocations = await httpService.getUserLocations(userId);
            setUserLocations(userLocations);
            setFilteredLocations(userLocations);
          } catch (e) {
            setUserLocations([]);
          }
        }

        fetchUserLocations();

        return () => {
          console.log('Refreshed the list: ' + isActive);
          isActive = false;
        };
      }, [userId]),
  );

  // Handle the search function
  function handleSearch(event: string) {
    if (userLocations && filteredLocations) {
      setFilteredLocations(userLocations.filter((visit) => (visit.name.toLowerCase().includes(event.toLowerCase()))));
    }
  }

  // Handle deletion of a visit
  async function handleDelete(visit: Visit) {
    const visitId = visit._id ? visit._id : '';
    const response = await httpService.deleteLocation(visitId);

    if (response && response === 'Visit deleted!') {
      setModalVisible(!modalVisible);
    } else {
      Alert.alert('Location delete failed', 'Something went wrong...');
    }
  }

  // Handle the sorting of the list
  function sortVisits(sortCriteria: number) {
    // If filteredLocations exist
    // and it is not empty
    if (filteredLocations && filteredLocations.length) {
      switch (sortCriteria) {
        case 1:
          // Sort filteredLocations
          setFilteredLocations(filteredLocations.concat().sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          }));
          break;
        case 2:
          // Sort filteredLocations
          setFilteredLocations(filteredLocations.concat().sort((a, b) => {
            if (a.visited && !b.visited) {
              return -1;
            }
            if (!a.visited && b.visited) {
              return 1;
            }
            return 0;
          }));
          break;
        case 3:
          // Sort filteredLocations
          setFilteredLocations(filteredLocations.concat().sort((a, b) => {
            if ((a.category && b.category && a.category < b.category) || (a.category && !b.category)) {
              return -1;
            }
            if ((a.category && b.category && a.category > b.category) || (!a.category && b.category)) {
              return 1;
            }
            return 0;
          }));
          break;
      }
    }
  }

  // Handle location press
  function handleLocationPress(visit: Visit) {
    setChosenLocation(visit);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
              <Text style={styles.modalHeader}>{chosenLocation?.name}</Text>
              <Pressable
                style={[styles.button, styles.buttonEdit]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('ModifyLocation', {
                    userInformation: chosenLocation,
                    locationInformation: chosenLocation,
                  });
                }}
              >
                <Ionicons name="create-outline" size={20} color="white" />
              </Pressable>
            </View>
            <Text style={styles.modalText}>Category: {chosenLocation?.category}</Text>
            <Text style={styles.modalText}>Date created: {chosenLocation?.dateCreated}</Text>
            <Text style={styles.modalText}>Visited: {chosenLocation?.visited ? 'True' : 'False'}</Text>
            <Text style={styles.modalText}>Comments: {
              chosenLocation?.comments ? chosenLocation.comments[0].comment : 'No comments.'
            }</Text>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: 20,
            }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonDelete]}
                onPress={() => handleDelete(chosenLocation as Visit)}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <LinearGradient
        colors={['#080808', '#082c6c']}
        style={styles.linearGradient}
        start={{x: 0.5, y: 0.7}}
      >
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="grey"
          keyboardType="default"
          maxLength={26}
          onChangeText={(event) => handleSearch(event)}
        />
        <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 10, alignItems: 'center'}}>
          <TouchableOpacity style={styles.listFilter} onPress={() => sortVisits(1)}>
            <Text style={{color: '#0095ff', fontSize: 20, fontWeight: 'bold'}} >Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listFilter} onPress={() => sortVisits(2)}>
            <Text style={{color: '#0095ff', fontSize: 20, fontWeight: 'bold'}} >Visited</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listFilter} onPress={() => sortVisits(3)}>
            <Text style={{color: '#0095ff', fontSize: 20, fontWeight: 'bold'}} >Category</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{width: '100%'}}
          data={filteredLocations}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity style={styles.listItem} onPress={() => handleLocationPress(item)}>
                <Text style={{fontSize: 20, color: 'white', width: '33%', flexShrink: 1}}>{item.name}</Text>
                <Text style={{fontSize: 20, color: 'white', width: '33%', flexShrink: 1}}>{
                  item.visited ? 'True' : 'False'
                }</Text>
                <Text style={{fontSize: 20, width: '33%', color: 'white'}}>{item.category}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#222222',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#878683',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    textAlign: 'left',
    color: 'white',
    fontSize: 30,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    height: 40,
    width: '40%',
    backgroundColor: '#2069e0',
  },
  buttonDelete: {
    height: 40,
    width: '40%',
    backgroundColor: '#8f2c3b',
    marginLeft: 'auto',
  },
  buttonEdit: {
    marginLeft: 'auto',
    width: 40,
    marginBottom: 20,
    backgroundColor: '#2069e0',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'left',
    color: 'white',
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    fontSize: 25,
    color: 'white',
  },
  linearGradient: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    paddingTop: 100,
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
  listItem: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listFilter: {
    width: '33.33%',
    alignItems: 'center',
    borderColor: '#002336',
  },
});

export default LocationMenu;
