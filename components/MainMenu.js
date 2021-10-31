import React from "react";
import {View, Text, StyleSheet, Button} from 'react-native';

const MainMenu = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>Main Menu</Text>
            <Button 
                title="Add new location" 
                onPress={() => navigation.navigate("Add Location")}
            />
            <Button 
                title="Location menu" 
                onPress={() => navigation.navigate("Location Menu")}
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