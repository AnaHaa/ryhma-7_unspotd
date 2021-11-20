import React from 'react';
import {View, StyleSheet, TextInput, Text, FlatList, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const LocationMenu = ({route, navigation}: { route: any, navigation: any }) => {
  // const userObject = route.params.userInformation;
  // const userLocations = route.params.userLocations;
  const str = 'location information here';
  const data = Array(100).fill(str, 0);
  // let renderItem = <Text></Text>;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#080808', '#082c6c']}
        style={styles.linearGradient}
        start={{x: 0, y: 0.7}}
      >
        <Text style={styles.header}>
                    Username
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="grey"
          keyboardType="default"
        />
        <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 10, alignItems: 'center'}}>
          <TouchableOpacity style={styles.listFilter}>
            <Text style={{color: '#0095ff', fontSize: 20}} >Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listFilter}>
            <Text style={{color: '#0095ff', fontSize: 20}} >Visited</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listFilter}>
            <Text style={{color: '#0095ff', fontSize: 20}} >Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listFilter}>
            <Text style={{color: '#0095ff', fontSize: 20}} >Tags</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{width: '100%'}}
          data={data}
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text style={{fontSize: 20, color: 'white'}}>{item}</Text>
            </View>
          )}
        />
      </LinearGradient>
    </View>
  );
};
/*
const renderItem = () => {

}
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 5,
    fontSize: 40,
    color: 'white',
  },
  linearGradient: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
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
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    alignItems: 'center',
  },
  listFilter: {
    width: '25%',
    alignItems: 'center',
    borderColor: '#002336',
  },
});

export default LocationMenu;
