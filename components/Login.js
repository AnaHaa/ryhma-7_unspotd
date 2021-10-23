import React from "react";
import {View, Text, StyleSheet, TextInput, Button, ViewPropTypes} from 'react-native';

const Login = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Button 
                title="Login" 
                onPress={() => navigation.navigate("Main Menu")}
            />
            <Button 
                title="Sign up" 
                onPress={() => navigation.navigate("Sign Up")}
            />
            <Button 
                title="Help" 
                onPress={() => navigation.navigate("Help")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    }
})

export default Login;