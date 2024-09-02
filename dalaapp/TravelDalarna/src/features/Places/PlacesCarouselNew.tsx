import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import DisplayCategories from "../../components/categories/DisplayCategories.tsx";
import React from "react";

const { width} = Dimensions.get('window')
const CARD_WIDTH=width*0.6;
const offsetRight=width/2-CARD_WIDTH/2




function PlacesCarouselNew({data,onEndReached,NavigateToPlacePage,isHorizontal=false}) {
    return (
        <FlatList
            horizontal
            data={data}
            style={styles.scrollCont}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.8}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item,index }) => {
                const image_uri= "http://localhost:4000/uploads/"+item.id+"/"+item.photos[0];
                return (
                    <TouchableOpacity key={item.id} style={styles.placeCont} onPress={()=>NavigateToPlacePage(item)}>
                        <View style={styles.placeImageCont}>
                            <Image style={styles.placeImage}  source={{uri:image_uri}} />
                            <View style={styles.categoriesCont}>
                                <View style={{display:"flex",flexDirection:"row",gap:5,}}>
                                    {item.categories.map((category, index) => {
                                        return(
                                            <View key={index}>
                                                <DisplayCategories category={category} size={30}/>
                                            </View>)
                                    })}
                                </View>
                            </View>
                        </View>
                        <View style={styles.placeText}>
                            <Text style={styles.text}>{item.title}</Text>

                        </View>
                    </TouchableOpacity>

                )
            }}
            keyExtractor={(item) => item._id}
        />
    );
}

const styles = StyleSheet.create({
    scrollCont:{
        height:"100%",
        width:"100%",
        display:"flex",

    },
    placeCont:{
        width:CARD_WIDTH,
        height:"100%",
        marginRight:20,
        borderRadius:10,
        shadowOpacity:0.15,shadowRadius:7.5,elevation:5,
    },
    placeImageCont:{
        height:"70%",
   
    },
       placeImage:{
           width:'100%',
           height:'100%',
           objectFit:"cover",
           borderTopLeftRadius:10,
           borderTopRightRadius:10,
           backgroundColor:"#000000",
       },
    placeText:{
        height:"30%",
        backgroundColor:"#ffffff",
        paddingHorizontal:5,
        paddingVertical:7,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    },
     text:{
            fontSize:15,
            fontWeight:"bold",

        },
});

export default PlacesCarouselNew;