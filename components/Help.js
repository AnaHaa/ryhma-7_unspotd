import React from "react";
import {View, Text, StyleSheet, TextInput, Button, ViewPropTypes} from 'react-native';

const Help = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>here is help</Text>
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

export default Help;