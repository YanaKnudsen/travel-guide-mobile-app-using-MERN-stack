import {StyleSheet, TextInput, View} from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6.js";
import React from "react";
import {observer} from "mobx-react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5.js";


function DisplayCategories({category,size=30,}) {
    return (
                    <View>
                        {    //change to map for ech category icon name
                            category==="fika" && (
                                <View style={[styles.categoryCont,{backgroundColor: '#a3a7e4',width:size,height:size}]}>
                                    <FontAwesome5 name="coffee" size={17} />
                                </View>
                            ) }
                        {    //change to map for ech category icon name
                            category==="restaurants" && (
                                <View style={[styles.categoryCont,{backgroundColor: '#f0f1b3',width:size,height:size}]}>
                                    <FontAwesome5 name="utensils" size={17} />
                                </View>
                            ) }
                        {    //change to map for ech category icon name
                            category==="shops" && (
                                <View style={[styles.categoryCont,{backgroundColor: '#bae2be',width:size,height:size}]}>
                                    <FontAwesome5 name="shopping-cart" size={17} />
                                </View>
                            ) }
                        {    //change to map for ech category icon name
                            category==="attractions" && (
                                <View style={[styles.categoryCont,{backgroundColor: '#c5e5e3',width:size,height:size}]}>
                                    <FontAwesome5 name="eye" size={17} />
                                </View>
                            ) }
                        {    //change to map for ech category icon name
                            category==="toDo" && (
                                <View style={[styles.categoryCont,{backgroundColor: "#ffd3b6",width:size,height:size}]}>
                                    <FontAwesome6 name="masks-theater" size={17} />
                                </View>
                            ) }
                        {    //change to map for ech category icon name
                            category==="accommodation" && (
                                <View style={[styles.categoryCont,{backgroundColor: "#93e4c1",width:size,height:size}]}>
                                    <FontAwesome5 name="bed" size={17} />
                                </View>
                            ) }
                        {    //change to map for ech category icon name
                            category==="camping" && (
                                <View style={[styles.categoryCont,{backgroundColor: "#fdc57b",width:size,height:size}]}>
                                    <FontAwesome5 name="caravan" size={17} />
                                </View>
                            ) }
                    </View>
    );
}

const styles = StyleSheet.create({
    categoryCont:{
        width:30,
        height:30,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }

});

export default observer(DisplayCategories);