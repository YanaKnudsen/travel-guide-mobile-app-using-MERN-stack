import {StyleSheet, TouchableOpacity,} from "react-native";
import store from "../../services/mobx/AppDataStore.ts";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5.js";
import React from "react";



function FilterButton({onClick}) {
    return (
            <TouchableOpacity style={[styles.sliderIconCont,{borderColor:  (Object.values(store.chosenCategories).includes(true) || store.radius!=store.initradius) ? "#EA5D5C":"#d3d6db"}]} onPress={onClick}>
                <FontAwesome5 name="sliders-h" size={25} />
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    sliderIconCont:{
        backgroundColor:"#fafafa",
        padding:10,
        borderRadius:10,
        borderColor:"#d3d6db",
        borderWidth:2,
        shadowOpacity:0.15,
        shadowRadius:7.5,
        elevation:5,
    },

});

export default FilterButton;