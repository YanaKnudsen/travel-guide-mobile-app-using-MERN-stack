import {
    Animated,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    Dimensions, FlatList
} from "react-native";
import React, {useEffect} from "react";
import store from "../../../services/mobx/AppDataStore.ts";
import { observer } from "mobx-react";
const {height, width} = Dimensions.get('window')
const CARD_WIDTH=width*0.8;
const offsetRight=width/2-CARD_WIDTH/2


function PlacesCarousel() {
    return (
        <FlatList
            data={store.nearestPlaces}
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            style={styles.allplaces}
            contentInset={{
                top:0,
                left:offsetRight,
                bottom:0,
                right:offsetRight,
            }}
            contentOffset={{x: -offsetRight, y: 0}}
            pagingEnabled
            snapToAlignment="center"

       />
    );
}

const styles = StyleSheet.create({
    placeView:{
        width:CARD_WIDTH,
        height:175,
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
        borderRadius:10,
        backgroundColor:'#ffffff',
        marginRight:10,
        borderColor:'#000000',
        shadowOpacity:0.15,
        shadowRadius:7.5,
        elevation:5,
        marginBottom:40,
    },
    placeImage:{
        width:'100%',
        height:100,
        borderRadius:10,
    },

});

export default observer(PlacesCarousel);