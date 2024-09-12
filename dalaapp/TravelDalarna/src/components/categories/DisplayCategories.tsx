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
                                <View style={[styles.categoryCont,{backgroundColor: '#E6D3F1',width:size,height:size}]}>
                                    <FontAwesome5 name="coffee" size={17} />
                                </View>
                            ) }
                        {    //change to map for ech category icon name
                            category==="restaurants" && (
                                <View style={[styles.categoryCont,{backgroundColor: '#FFF2B5',width:size,height:size}]}>
                                    <FontAwesome5 name="utensils" size={17} />
                                </View>
                            ) }
                        {    //change to map for ech category icon name
                            category==="shops" && (
                                <View style={[styles.categoryCont,{backgroundColor: '#B5F5D2',width:size,height:size}]}>
                                    <FontAwesome5 name="shopping-cart" size={17} />
                                </View>
                            ) }
                        {    //change to map for ech category icon name
                            category==="attractions" && (
                                <View style={[styles.categoryCont,{backgroundColor: '#A7D8F0',width:size,height:size}]}>
                                    <FontAwesome5 name="eye" size={17} />
                                </View>
                            ) }
                        {    //change to map for ech category icon name
                            category==="toDo" && (
                                <View style={[styles.categoryCont,{backgroundColor: "#F9C2D1",width:size,height:size}]}>
                                    <FontAwesome6 name="masks-theater" size={17} />
                                </View>
                            ) }
                        {    //change to map for ech category icon name
                            category==="accommodation" && (
                                <View style={[styles.categoryCont,{backgroundColor: "#CBBEEB",width:size,height:size}]}>
                                    <FontAwesome5 name="bed" size={17} />
                                </View>
                            ) }
                        {    //change to map for ech category icon name
                            category==="camping" && (
                                <View style={[styles.categoryCont,{backgroundColor: "#FFD5B5",width:size,height:size}]}>
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