import {StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";


function ThinLine({name=""}) {
    return (
        <View style={styles.thinLine}></View>
    );
}

const styles = StyleSheet.create({
    thinLine:{
       height: 0.5,width: "100%",
        backgroundColor: "#d8d7d7",
    }


});

export default ThinLine;