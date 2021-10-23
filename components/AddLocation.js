import React from "react";
import {View, Text, StyleSheet, TextInput, Button, ViewPropTypes} from 'react-native';

const AddLocation = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>New Location</Text>
            <Button 
                title="Confirm new location" 
                onPress={() => navigation.navigate("Main Menu")}
            />
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

export default AddLocation;