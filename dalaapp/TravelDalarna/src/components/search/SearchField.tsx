import {StyleSheet, TextInput, View} from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6.js";
import React from "react";


function SearchField() {
    return (
        <View style={styles.searchField} >
            <TextInput style={{width:'85%',height:'100%',}} placeholder="Find places..."/>
            <FontAwesome6 name="magnifying-glass" size={15} />
        </View>
    );
}

const styles = StyleSheet.create({

    searchField:{
        width:'80%',
        backgroundColor:"#fafafa",
        borderColor:"#d3d6db",
        borderWidth:2,
        shadowOpacity:0.15,
        shadowRadius:7.5,
        elevation:5,
        height:50,
        display:"flex",
        paddingHorizontal:10,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-between",
        borderRadius:30,
    },

});

export default SearchField;