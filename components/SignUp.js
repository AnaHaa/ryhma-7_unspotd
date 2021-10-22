import React from "react";
import {View, Text, StyleSheet, TextInput, Button, ViewPropTypes} from 'react-native';

const SignUp = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>Create Account</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent  :'center',
        alignItems: 'center',
        flex: 1,
    }
})

export default SignUp;