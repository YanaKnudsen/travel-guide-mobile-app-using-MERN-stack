import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import DisplayCategories from "../../components/categories/DisplayCategories.tsx";
import React from "react";




function PlacesCarousel({data,onEndReached,NavigateToPlacePage,isHorizontal=false}) {
    return (
        <FlatList
            horizontal={isHorizontal}
            style={styles.scrollCont}
            data={data}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.8}
            //  refreshControl={
            //     <RefreshControl refreshing={isRefreshing} onRefresh={()=>setRefreshing(true)} tintColor={"#EA5D5C"} />
            //   }
            contentInset={{
                top:0,
                left:0,
                bottom:50,
                right:0,
            }}
            // ListFooterComponent={ListEndLoader} // Loader when loading next page.
            renderItem={({ item,index }) => {
                const image_uri= "http://localhost:4000/uploads/"+item.id+"/"+item.photos[0];
                return (
                    <TouchableOpacity key={item.id} style={styles.placeCont} onPress={()=>NavigateToPlacePage(item)}>
                        <View style={styles.placeImage}>
                            <Image style={{width:'100%',height:'100%',borderTopLeftRadius:10,borderTopRightRadius:10,objectFit:"cover"}}  source={{uri:image_uri}} />
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
                            <Text style={{fontSize:20}}>{item.title}</Text>

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
        paddingHorizontal:20,
        paddingVertical:10,
        height:'100%',
    },
    placeCont:{
        backgroundColor:'#fafafa',
        width:'100%',
        height:200,
        borderRadius:10,
        shadowOpacity:0.15,shadowRadius:7.5,elevation:5,
        marginTop:10,
    },
    placeImage:{
        width:'100%',
        height:'70%',
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        backgroundColor:'#000000',
        position:"relative",
    },

    categoriesCont:{
        position:"absolute",
        bottom:0,
        right:0,
        width:"100%",
        height:35,
        display:"flex",
        flexDirection:"row",
        gap:5,
        justifyContent:"flex-end",
        alignItems:"center",
        paddingHorizontal:10,
        paddingVertical:5,
    },
    placeText:{
        width:'100%',
        height:'30%',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        paddingHorizontal:10,
        paddingVertical:10,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },



});

export default PlacesCarousel;