import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import store from "../../services/mobx/AppDataStore.ts";
import { observer } from "mobx-react";



function CheckboxCategory({name="",category,onClick}) {
    return (
        <TouchableOpacity style={[styles.checkbox,{borderColor:  store.chosenCategories[category]==true ? "#000000":"#d8d7d7"}]} onPress={onClick}>
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    checkbox:{
        borderWidth:2,
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
    },
    name:{

    }

});

export default observer(CheckboxCategory);