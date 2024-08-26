
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    View,Animated,
     TouchableOpacity, TextInput,Linking,
} from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import DisplayCategories from "../components/categories/DisplayCategories.tsx";
const {height, width} = Dimensions.get('window')
const CARD_WIDTH=width;





function PlacePage({route,navigation}): React.JSX.Element {
    function goBack(){
        navigation.goBack();
    }
    function callWebsite(website){
        Linking.canOpenURL(website).then(supported => {
              if (supported) {
                Linking.openURL(website);
              } else {
                console.log("Don't know how to open URI: " + website);
              }
            });
    }

    const { placeObj} = route.params;
    return (
       <View style={{width:"100%",height:"100%",}}>
           <View >
               <View style={styles.photosCont}>


                   <Animated.ScrollView
                       horizontal
                       scrollEventThrottle={1}
                       showsHorizontalScrollIndicator={false}
                       pagingEnabled
                       snapToAlignment="center"
                       style={styles.photosView}
                       snapToInterval={CARD_WIDTH}
                   >
                     {placeObj.photos.map((photo, index) => {
                         const image_uri= "http://localhost:4000/"+placeObj.id+"/"+photo;
                         console.log(image_uri);
                     return(
                         <View key={index} style={{height:"100%",width:width,backgroundColor:"#ff00ff",}}>
                            <Image style={{width:'100%',height:'100%',}} source={{uri:image_uri}}/>
                         </View>
                     )
                     })}
                   </Animated.ScrollView>
                    <SafeAreaView style={styles.upperNavCont}>                                     
                             <TouchableOpacity style={styles.backButton} onPress={goBack}>         
                                  <FontAwesome5 name="arrow-left" size={15} color="#565656" />     
                             </TouchableOpacity>                                                   
                    </SafeAreaView>                                                                
               </View>
               <View style={styles.infoCont}>
                   <View style={{display:"flex", flexDirection:"row",gap:5, }}>
                      {placeObj.categories.map((category, index) => {
                      return(
                          <View key={index}>
                                <DisplayCategories category={category} size={30}/>
                              </View>
                      )
                      })}
                   </View>
                   <Text style={styles.title}>{placeObj.title}</Text>
                   <View style={{width:"100%",display:"flex",flexDirection:"row", gap:5, marginBottom:10,}}>
                   <FontAwesome6 name="location-dot" size={15} color="#565656" />
                   <Text style={styles.address}>{placeObj.address}</Text>
                   </View>
                   {/*<Text style={styles.description}>{placeObj.description}</Text>*/}
                   <View style={styles.socialCont}>
                       {placeObj.website.length>0 && <TouchableOpacity onPress={() => callWebsite(placeObj.website)}>
                           <Text style={styles.website}>Visit Website</Text>
                       </TouchableOpacity>}
                       <View style={styles.socials}>
                           {placeObj.facebook.length>0 && <TouchableOpacity onPress={()=>callWebsite(placeObj.facebook)}>
                                <Image style={{width: 30, height: 30,}}
                                       source={require("../../assets/icons/facebook.png")}/>
                           </TouchableOpacity>}
                           {placeObj.instagram.length>0 &&<TouchableOpacity onPress={()=>callWebsite(placeObj.instagram)}>
                              <Image style={{width: 35, height: 35,}}
                                       source={require("../../assets/icons/instagram.png")}/>
                           </TouchableOpacity>}
                           <TouchableOpacity></TouchableOpacity>
                       </View>

                   </View>
               </View>
               <View style={styles.buttonCont}>
               <TouchableOpacity style={styles.Button}>
                   <Text style={styles.buttonText}>Directions</Text>
                   <FontAwesome6 name="diamond-turn-right" size={20} />
               </TouchableOpacity>
               </View>
           </View>


       </View>
    );
}

const styles = StyleSheet.create({
      photosCont:{
          width:"100%",
          height:"45%",
          position:"relative",

      },
    title:{
          fontSize:25,
    },
    description:{
          fontSize:17,
    },
    infoCont:{
        display:"flex",
        width:"100%",
        flexDirection:"column",
        paddingVertical:15,
        paddingHorizontal:10,
        gap:5,
    },
    address:{
        color:"#565656"
    } ,
    photost:{
        width:"100%",
        height:"100%",
        backgroundColor:"#ff0fff"
        
    } ,
    photosView:{
        width:"100%",
      
    },
    Button:{
          width:"40%",
          backgroundColor: "#64c4ed",
          height:40,
        borderRadius:20,
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        flexDirection:"row",
        paddingHorizontal:10,
    }   ,
    buttonCont:{
          width:"100%",
        paddingHorizontal:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
    },
    buttonText:{
          fontSize:17,
    }    ,
    categoryCont:{
         width:30,
        height:30, 
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }   ,
    socialCont:{
       width:"100%" ,
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        paddingVertical:5,
    },
    upperNavCont:{
        position:"absolute",
        width:"100%",
        top:0,
        left:0,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    }   ,
    backButton:{
          marginLeft:10,
          width:40,
        height:40,
        borderRadius:20,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"     ,
        backgroundColor:"#ffffff"
    } ,
    website:{
          color:"blue",
          textDecorationLine: 'underline' ,
        fontSize:15,
    },
    socials:{
          display:"flex",
        flexDirection:"row",
        gap:5,
        justifyContent:"center",
        alignItems:"center",
    }
});

export default PlacePage;
