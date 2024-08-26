import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import store from "../../mobx/AppDataStore.ts";
import { observer } from "mobx-react";



function Checkbox({name="",onClick}) {
    return (
        <TouchableOpacity style={[styles.checkbox,{borderColor: store.radius==(Number(name.split(" ")[0])*1000) ? "#000000":"#d8d7d7"}]} onPress={onClick}>
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

export default observer(Checkbox);