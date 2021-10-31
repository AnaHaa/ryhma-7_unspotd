import React from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'


const Help = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#080808', '#0095ff']}
                style={styles.linearGradient}
                start={{ x: 0.5, y: 0.8}}
            >
                    
                <Text style={styles.header}>
                    <Icon name="location-pin" size={40} color="blue" /> 
                    UnSpotd
                </Text>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={{color: 'white', fontSize: 15}} >Got it</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    text: {
        padding: 10,
        fontSize: 20,
        color: 'white',
    },
    header: {
        padding: 5,
        fontSize: 50,
        color: 'white'
    },
    button: {
        marginTop: 50,
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
        width: '95%',
        backgroundColor: 'blue',
    },
})

export default Help;