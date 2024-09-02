import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text, TouchableOpacity,
} from 'react-native';
import store from "../../services/mobx/AppDataStore.ts";
import PlacesCarouselNew from "../Places/PlacesCarouselNew.tsx";

import { observer } from "mobx-react";
import {FetchPlaces} from "../../services/api/fetchPlaces.ts";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5.js";
//to-do fix safe area view
function ProfileContent({addNewPlace}): React.JSX.Element {
    const [myPlaces,setMyPlaces]=useState([]);
    const [loading,setLoading]=useState([]);

    //when location is obtained show ten nearest places
    useEffect(() => {
        FetchPlaces("",store.myLocation[0],store.initradius,null,10,setLoading,setMyPlaces,myPlaces,false);
    }, []);



    function onEndReached(){

    }
    function NavigateToPlacePage(){

    }

    function deleteAccount(){

    }



    return (
        <View style={styles.ProfileContentView}>
            <View style={styles.welcome}>
                <Text style={styles.welcomeText}>Hej {store.user?.fullName.split(" ")[0]} !</Text>
            </View>
            <View>
                <View style={styles.myPlaces}>
                    <Text style={styles.myPlacesTextMain}>My Places</Text>
                    <TouchableOpacity style={styles.addPlacesButton} onPress={addNewPlace}>
                        <Text>Add new place</Text>
                        <FontAwesome5 name="plus" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={{height:200,paddingVertical:30,}}>
                <PlacesCarouselNew data={myPlaces} onEndReached={onEndReached} NavigateToPlacePage={NavigateToPlacePage} isHorizontal={true}/>
                </View>
                <View >
                    <TouchableOpacity style={styles.deleteAccountButton} onPress={deleteAccount}>
                        <FontAwesome5 name="user-minus" size={20} />
                        <Text>Delete account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    ProfileContentView:{
        display:"flex",
        flex:1,
        width:"100%",
        flexDirection:"column",
        backgroundColor:"#ffffff99",
        paddingHorizontal:20,
    },
    welcome:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:40,
    },
    welcomeText:{
        fontSize:25,
        fontWeight:"bold",
    },
    myPlaces:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    myPlacesTextMain:{
        fontSize:20,
        fontWeight:"bold",
    },
    addPlacesButton:{
        backgroundColor:"#ffffff",
        justifyContent:"space-between",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:10,
        paddingHorizontal:10,
        paddingVertical:7,
        borderRadius:15,
        borderWidth:1,
        shadowOpacity:0.15,shadowRadius:7.5,elevation:5,
        borderColor:"#d3d6db"
    },
    deleteAccountButton:{
        width:"40%",
        backgroundColor:"#EA5D5C",
        marginBottom:20,
        display:"flex",
        flexDirection:"row",
        paddingVertical:7,
        paddingHorizontal:10,
        gap:5,
        alignItems:"center",
        justifyContent:"space-around",
        borderRadius:10,
        shadowOpacity:0.15,shadowRadius:7.5,elevation:5,
    },
});

export default observer(ProfileContent);