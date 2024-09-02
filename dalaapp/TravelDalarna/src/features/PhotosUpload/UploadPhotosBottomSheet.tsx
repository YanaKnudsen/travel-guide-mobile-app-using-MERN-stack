import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6.js";

const { width} = Dimensions.get('window')


function UploadPhotosBottomSheet() {

    return (
        <View style={styles.photoUploader}>
            <Text style={styles.title}>Choose photos</Text>
            <View style={{width:"90%",height:"100%",display:"flex",flexDirection:"row",gap:5, justifyContent:"space-around",}}>
                <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <TouchableOpacity style={styles.uploadItem}>
                    <FontAwesome6 name="photo-film" size={30} />
                </TouchableOpacity>
                <Text>Choose from gallery</Text>
                </View>
                <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <TouchableOpacity style={styles.uploadItem}>
                    <FontAwesome6 name="camera" size={30} />
                </TouchableOpacity>
                <Text>Make a photo</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    photoUploader:{
        width:"100%",
        height:"90%",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    uploadItem:{
        width:width*0.25,
        height:width*0.25,
        backgroundColor:"#e3e3e3",
        borderRadius:20,
        shadowOpacity:0.15,shadowRadius:7.5,elevation:5,
        justifyContent:"center",
        alignItems:"center",
        borderColor:"#d0d0d0",
        borderWidth:1,
        marginBottom:10
    },
    title:{
        fontSize:20,
        marginBottom:20,
    },



});

export default UploadPhotosBottomSheet;