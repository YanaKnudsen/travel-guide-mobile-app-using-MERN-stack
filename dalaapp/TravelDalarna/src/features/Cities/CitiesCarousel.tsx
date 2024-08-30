import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import React from "react";
import store from "../../services/mobx/AppDataStore.ts";
import {chooseCity, unChooseCity} from "../../actions/filterPlaces.ts";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6.js";




function CitiesCarousel({data,onEndReached,setSearchString}) {
    return (
        <View style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <FlatList
                horizontal
                data={data}
                scrollEventThrottle={1}
                onEndReachedThreshold={0.8}
                showsHorizontalScrollIndicator={false}
                style={styles.horizScrollCont}
                onEndReached={onEndReached} //show next page
                contentInset={{
                    top:0,
                    left:10,
                    bottom:0,
                    right:10,
                }}
                contentOffset={{x: -10, y: 0}}
                renderItem={({item,index }) => {
                    return(
                        <TouchableOpacity style={[styles.city,{borderColor: (store.chosenCity?.name==item.name)?"#000000":"#d8d7d7", paddingHorizontal:(store.chosenCity?.name==item.name)?15:7, height:(store.chosenCity?.name==item.name)?45:35}]} onPress={()=>chooseCity(item,setSearchString)}>
                            <View style={{position:"absolute",top:0,right:0,paddingVertical:5,paddingHorizontal:5,height:'100%',width:'100%',display:"flex"}}>
                                {(store.chosenCity?.name==item.name) &&
                                    <TouchableOpacity onPress={()=>unChooseCity(setSearchString)} style={{height:'100%',display:"flex",alignItems:"flex-end"}}>
                                        <FontAwesome6 name="xmark" size={10}/>
                                    </TouchableOpacity>}
                            </View>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>

                    )
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    horizScrollCont:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        paddingVertical:10,
    },
    city:{
        display:"flex",
        flexDirection:"row",
        gap:5,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#ffffff",
        borderRadius:7,
        marginRight:20,
        shadowOpacity:0.15,
        shadowRadius:5.5,
        elevation:5,
        borderWidth:2,
        alignSelf:"center",
        position:"relative",
    },
});

export default CitiesCarousel;