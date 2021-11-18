import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";

const Help = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                <Ionicons name="location-sharp" size={50} color="white" />
                UnSpotd
            </Text>
            <LinearGradient
                colors={['#080808', '#082c6c']}
                style={styles.linearGradient}
                start={{ x: 0, y: 0.7 }}
            >
                <Text style={styles.text}>
                    This is a student project made for school course Ohjelmistotekniikan mobiiliprojekti 2021 syksy.
                    Personal data is stored to create personal locations. By giving us your email and possible name, you consent
                    to us storing and using this information for this application. Email antti.haarala@tuni.fi to request
                    your personal data or to remove it from our database.
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={{ color: 'white', fontSize: 15 }} >Got it</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    header: {
        padding: 5,
        fontSize: 50,
        color: 'white',
        alignSelf: 'center',
        marginTop: 100
    },
    linearGradient: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    text: {
        marginTop: 20,
        marginBottom: 40,
        padding: 10,
        fontSize: 20,
        color: 'white',
        width: '80%'
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
        backgroundColor: '#2069e0',
    },
})

export default Help;