import React, {useState, useEffect} from "react";
import { View, StyleSheet, TextInput, Text, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Visits } from '../interfaces/index'


const LocationMenu = ({ route }: any) => {

    const [filteredVisits, setFilteredVisits] = useState<Visits>();
    const [visits, setVisits] = useState<Visits>();

    useEffect(() => {
        if(route.params.visits) {
            setVisits(route.params.visits);
            setFilteredVisits(route.params.visits);
        }
    }, [])

    function handleSearch(event: any) {
        if(visits && filteredVisits) {
            setFilteredVisits(visits.filter(visit => (visit.name.toLowerCase().includes(event.toLowerCase()))));
        }
    }

    function sortVisits(sortCriteria: number) {
        if(filteredVisits) {
            switch(sortCriteria) {
                case 1:
                    setFilteredVisits(filteredVisits.concat().sort((a, b) => {
                        if(a.name < b.name) {
                            return -1;
                        }
                        if(a.name > b.name) {
                            return 1;
                        }
                        return 0;
                    }));
                    break;
                case 2:
                    setFilteredVisits(filteredVisits.concat().sort((a, b) => {
                        if(a.visited && !b.visited) {
                            return -1;
                        }
                        if(!a.visited && b.visited) {
                            return 1;
                        }
                        return 0;
                    }));
                    break;
                case 3:
                    setFilteredVisits(filteredVisits.concat().sort((a, b) => {
                        if((a.category && b.category && a.category < b.category) || (a.category && !b.category)) {
                            return -1;
                        }
                        if((a.category && b.category && a.category > b.category) || (!a.category && b.category)) {
                            return 1;
                        }
                        return 0;
                    }));
                    break;
            }
        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#080808', '#082c6c']}
                style={styles.linearGradient}
                start={{ x: 0, y: 0.7 }}
            >
                <Text style={styles.header}>
                    {route.params.user.userName}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor="grey"
                    keyboardType="default"
                    onChangeText={(event) => handleSearch(event)}
                />
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 10, alignItems: 'center' }}>
                    <TouchableOpacity style={styles.listFilter} onPress={() => sortVisits(1)}>
                        <Text style={{ color: '#0095ff', fontSize: 20 }} >Location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listFilter} onPress={() => sortVisits(2)}>
                        <Text style={{ color: '#0095ff', fontSize: 20 }} >Visited</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listFilter} onPress={() => sortVisits(3)}>
                        <Text style={{ color: '#0095ff', fontSize: 20 }} >Category</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ width: '100%' }}
                    data={filteredVisits}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text style={{ fontSize: 20, color: 'white', marginRight: 5, flexShrink: 1, }}>{item.name}</Text>
                            <Text style={{ fontSize: 20, color: 'white' }}>{item.dateCreated}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </LinearGradient>
        </View>
    )
}

const renderItem = () => {

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        fontSize: 25,
        color: 'white'
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
        flex: 1,
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listFilter: {
        width: '25%',
        alignItems: 'center',
        borderColor: '#002336'
    },
})

export default LocationMenu;