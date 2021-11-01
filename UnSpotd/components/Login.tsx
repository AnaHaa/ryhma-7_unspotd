import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";

const Login = ({ navigation }: { navigation: any }) => {
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
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="grey"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="grey"
                    keyboardType="visible-password"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Main Menu")}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.textButton}
                    onPress={() => navigation.navigate("Sign Up")}
                >
                    <Text style={styles.textButtonText}>Create an account</Text>
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
        marginTop: 100
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
        backgroundColor: '#2069e0',
    },
    textButton: {
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'flex-end',
        color: '#2069e0'
    }
})

export default Login;