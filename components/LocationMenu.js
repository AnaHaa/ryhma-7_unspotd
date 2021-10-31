import React from "react";
import { View, StyleSheet, TextInput, Text, FlatList, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const LocationMenu = () => {

    var str = "location information here";
    const data = Array(100).fill(str,0);
    const renderItem = <Text></Text>

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#080808', '#0095ff']}
                style={styles.linearGradient}
                start={{ x: 0.5, y: 0.7}}
            >
                <Text style={styles.header}>
                    Username
                </Text>
                <TextInput style={styles.input} placeholder='Search'  />
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 10, alignItems: 'center' }}>
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
    )
}

const renderItem = () => {

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 5,
        fontSize: 40,
        color: 'white'
    },
    linearGradient: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 5,
        margin: 10,
        width: '75%',
        fontSize: 20,
        backgroundColor: 'white'
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
        alignItems: 'center'
    },
    listFilter: {
        width: '25%', 
        alignItems: 'center', 
        borderColor: '#002336'
    },
})

export default LocationMenu;