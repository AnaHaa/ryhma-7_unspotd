import React from "react";
import {View, Text, StyleSheet, TextInput, Button, ViewPropTypes} from 'react-native';

const MainMenu = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>Main Menu</Text>
            <Button 
                title="Add new location" 
                onPress={() => navigation.navigate("Add Location")}
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

export default MainMenu;