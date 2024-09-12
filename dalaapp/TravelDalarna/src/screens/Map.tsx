import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    ActivityIndicator,
    View,
    TouchableOpacity, TextInput, FlatList
} from 'react-native';
import {Marker} from 'react-native-maps';
import store from "../services/mobx/AppDataStore.ts";
import SearchField from "../components/search/SearchField.tsx";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import GetLocation from 'react-native-get-location';
const {height, width} = Dimensions.get('window')
const CARD_WIDTH=width*0.8;
const offsetRight=width/2-CARD_WIDTH/2
const offsetLeft=width/2+CARD_WIDTH/2
import { observer } from "mobx-react";
import {check, PERMISSIONS, request, RESULTS} from "react-native-permissions";
import AxiosInstance from "../axios/AxiosInstance.tsx";
import Animated from 'react-native-reanimated';
import { useSharedValue, withSpring,useAnimatedStyle,withTiming,useAnimatedProps } from 'react-native-reanimated';
import {CoordinateModel} from "../@types/CoordinateModel.ts";
import { OpenMapDirections } from 'react-native-navigation-directions';
import {showLocation} from 'react-native-map-link';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import ThinLine from "../components/decorations/ThinLine.tsx";
import CheckboxCategory from "../components/filter/CheckboxCategory.tsx";
import Checkbox from "../components/filter/Checkbox.tsx";
import {CitiesModel} from "../@types/CitiesModel.ts";
import Geolocation from "react-native-geolocation-service";
import MapView from "react-native-map-clustering";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const INITIAL_REGION = {
    latitude: 60.48473081560262,
    longitude: 15.43118044828889,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
};
import {unChooseCity, chooseCity} from "../actions/filterPlaces.ts";
import {animateToRegion} from "../actions/mapAnimations.ts";
import {FetchMarkers} from "../services/api/fetchMarkers.ts";
import {FetchPlaces} from "../services/api/fetchPlaces.ts";
import {FetchCities} from "../services/api/fetchCities.ts";
import {chooseCategories} from "../actions/filterPlaces.ts";
import FilterContent from "../features/Filter/Filter.tsx";
import BottomSheet from "../components/ui/BottomSheet.tsx";

//The app's Info.plist file must contain a NSLocationWhenInUseUsageDescription
// with a user-facing purpose string explaining clearly and completely why your app needs the location,
// otherwise Apple will reject your app submission.
// This is required whether or not you are accessing the users location, as Google Maps iOS SDK contains the code required to access the users location.
//from https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md

function Map({route,navigation}): React.JSX.Element {
    const animLatDelta=useSharedValue<number>(0.0922);//store.currentLat
    const animLongDelta=useSharedValue<number>(0.0421);
    const [places,setPlaces]=useState([]);
    const [cities,setCities]=useState(Array<CitiesModel>);
    const [loading,setLoading]=useState(false);
    const [chosenMarker,setChosenMarker]=useState([]);
    const [searchString,setSearchString]=useState("");
    const mapRef = useRef();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            store.setChosenCategories(store.initChosenCategories);
            store.setChosenCity(null);
            store.setRadius(store.initradius)
            store.setPreviousPage(route.name);
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    useEffect(()=>{
        store.setChosenCity(null);
        store.setRadius(store.initradius);
        FetchMarkers(searchString,store.chosenCategories,setLoading,false);
        FetchPlaces(searchString,store.chosenCity,store.initradius,store.chosenCategories,5,setLoading,setPlaces,places,false);
        FetchCities(searchString,5,setLoading,setCities,cities,false);
        animateToRegion(60.48473081560262, 15.43118044828889,5,5,mapRef);
    },[]);

    function onEndReachedPlaces(){
        FetchPlaces(searchString,store.chosenCity,store.radius,store.chosenCategories,5,setLoading,setPlaces,places,true);
    }

    function onEndReachedCities(){
        FetchCities(searchString,5,setLoading,setCities,cities,true);
    }

    //search for places or cities
    useEffect(()=>{
        if (store.chosenCity!=null && searchString.length>0){
            FetchMarkers(searchString,store.chosenCategories,setLoading,false);
            FetchPlaces(searchString,store.chosenCity,store.radius,store.chosenCategories,5,setLoading,setPlaces,places,false);
            return
        }
        FetchMarkers(searchString,store.chosenCategories,setLoading,false);
        FetchPlaces(searchString,store.chosenCity,store.radius,store.chosenCategories,5,setLoading,setPlaces,places,false);
        FetchCities(searchString,5,setLoading,setCities,cities,false);

    },[searchString]);

    useEffect(()=>{
        FetchMarkers(searchString,store.chosenCategories,setLoading,false);
        FetchPlaces(searchString,store.chosenCity,store.radius,store.chosenCategories,5,setLoading,setPlaces,places,false);
    },[store.chosenCategories]);

    useEffect(()=>{
        FetchPlaces(searchString,store.chosenCity,store.radius,store.chosenCategories,5,setLoading,setPlaces,places,false);
    },[store.radius]);

    useEffect(()=>{
        if (store.chosenCity==null){
            animateToRegion(60.48473081560262, 15.43118044828889,5,5,mapRef);
        }
        FetchPlaces(searchString,store.chosenCity,store.radius,store.chosenCategories,5,setLoading,setPlaces,places,false);

    },[store.chosenCity]);

    useEffect(()=>{
        if (chosenMarker.length>0){
            animLatDelta.value=0.009;
            animLongDelta.value=0.004;
        }else{
            animLatDelta.value=5;
            animLongDelta.value=5;
        }

    },[chosenMarker]);


    function NavigateToPlacePage(marker){
        navigation.navigate('PlacePage',{placeObj: marker});
    }

    function showDirections(placeLat,placeLong){
        const startPoint = {
            latitude: 60.150332,
            longitude: 15.185837,
        }
        console.log(placeLat,placeLong);
        const endPoint = {
            longitude: 61.19335058928549 ,
            latitude: 14.53177737986383,
        }
        const transportPlan = 'd';
        //showLocation({
         //   latitude: 38.8976763,
        //   longitude: -77.0387185,
         //   title: 'Your destination',
       // });
      //  try on the real phone
        OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
            console.log(res)
        });
    }
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);



    return (
        <SafeAreaView style={{height:'100%',width:'100%',display:'flex',alignItems:'center'}}>
            <BottomSheetModalProvider>
            <View style={{position:"relative",height:'100%',width:'100%',}}>

                  <MapView ref={mapRef} initialRegion={INITIAL_REGION} style={{ flex: 1 }} clusterColor={'#EA5D5C'}>

                  {store.markers.map((marker, index) => {
                      return(
                      <Marker
                          key={index}
                          coordinate={{latitude: marker.location[0], longitude: marker.location[1]}}
                          title={marker.title}
                          pinColor={
                          (chosenMarker[0]==marker.location[0] && chosenMarker[1]==marker.location[1])?'#ff0e00':(marker.title=="My location")?'#007FFF':'#EA5D5C'
                      }
                        //  description={marker.description}
                        //  onPress={(e)=>onMarkerPress(e)}
                      />


                      )})}
            </MapView>
            <View style={styles.searchCont}>
                <View style={{width:'100%',display:"flex",justifyContent:"space-between",alignItems:"center",paddingHorizontal:20,paddingVertical:10,flexDirection:"row"}}>
                    <View style={styles.searchField} >
                        <TextInput style={{width:'85%',height:'100%',}}
                                   placeholder={store.chosenCity?.name != null ? `${store.chosenCity.name}`: "Find places..."}
                                   onChangeText={text => setSearchString(text)}
                                   value={searchString}/>
                        <FontAwesome6 name="magnifying-glass" size={15} />
                    </View>
                    <TouchableOpacity style={[styles.sliderIconCont,{borderColor:  (Object.values(store.chosenCategories).includes(true) || store.radius!=store.initradius)  ? "#EA5D5C":"#d3d6db"}]} onPress={handlePresentModalPress}>
                        <FontAwesome5 name="sliders-h" size={25} />
                    </TouchableOpacity>
                </View>
                <AnimatedFlatList
                    horizontal
                    data={cities}
                    onEndReachedThreshold={0.8}
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    style={styles.horizScrollCont}
                    onEndReached={onEndReachedCities} //show next page
                    contentInset={{
                        top:0,
                        left:10,
                        bottom:0,
                        right:10,
                    }}
                    contentOffset={{x: -10, y: 0}}
                    renderItem={({item,index }) => {
                        return(
                            <TouchableOpacity style={[styles.city,{borderColor: (store.chosenCity?.name==item.name)?"#000000":"#d8d7d7", paddingHorizontal:(store.chosenCity?.name==item.name)?15:7, height:(store.chosenCity?.name==item.name)?45:35}]}
                                              onPress={()=> {
                                                  chooseCity(item,mapRef,setSearchString);
                                              }}
                            >
                                <View style={{position:"absolute",top:0,right:0,paddingVertical:5,paddingHorizontal:5,height:'100%',width:'100%',display:"flex"}}>
                                    {(store.chosenCity?.name==item.name) &&
                                        <TouchableOpacity onPress={()=> {
                                            unChooseCity(setSearchString);
                                        }}
                                                          style={{height:'100%',display:"flex",alignItems:"flex-end"}}>
                                            <FontAwesome6 name="xmark" size={10}/>
                                        </TouchableOpacity>}
                                </View>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>

                        )
                    }}
                />

            </View>

                <View style={{position:"absolute",bottom:0,left:0,width:"100%",height:"auto",display:"flex",justifyContent:"center",alignItems:"center",marginBottom:10}}>
                <AnimatedFlatList
                    data={places}
                    horizontal
                    scrollEventThrottle={1}
                    onEndReached={onEndReachedPlaces} //show next page
                    onEndReachedThreshold={1}//0.8
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
                    snapToInterval={CARD_WIDTH+10}
                    snapToAlignment="center"
                    renderItem={({ item,index }) => {
                        const image_uri= "https://dala.app.qnudsen.com/uploads/"+item.id+"/"+item.photos[0];
                        return(
                            <TouchableOpacity style={styles.placeView} key={index} onPress={()=> {
                                animateToRegion(item.location[0], item.location[1],0.009,0.004,mapRef);
                                setChosenMarker([item.location[0], item.location[1]]);
                            }}>
                                <View style={{width:"100%",}}>
                                    <View style={styles.placeImage}>
                                        <Image style={{width:'100%',height:'100%',borderTopLeftRadius:10,borderTopRightRadius:10,}} source={{uri:image_uri}}/>
                                    </View>
                                    <View style={{paddingHorizontal:20,paddingVertical:5,display:"flex",flexDirection:"column",gap:5,}}>

                                        <View style={styles.placeTitleCont}>
                                            <Text style={styles.placeTitle}>{item.title}</Text>
                                        </View>

                                        <View>
                                            {(store.chosenCity && store.hasLocationPermission) && <Text style={{color: "#565656"}}>{item.dist / 1000} km</Text>}
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.ButtonsCont}>
                                    <TouchableOpacity
                                        style={[styles.Button,{backgroundColor: "#B2EAB7"}]}
                                        onPress={()=>NavigateToPlacePage(item)}>
                                        <Text>Learn More</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.Button,{backgroundColor: "#A7D8F0"}]} onPress={()=>showDirections(marker.location[0],marker.location[1])}>
                                        <Text>Directions</Text>
                                        <FontAwesome6 name="diamond-turn-right" size={15} />
                                    </TouchableOpacity>
                                </View>

                            </TouchableOpacity>)
                    }}

                />

                </View>
            </View>

                <BottomSheet ref={bottomSheetModalRef} firstSnapPoint={'25%'} secondSnapPoint={'85%'}>
                    <FilterContent/>
                </BottomSheet>

            </BottomSheetModalProvider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    placeImage:{
        width:'100%',
        height:100,
        borderRadius:10,
    },
    markerWrap:{
        alignItems:"center",
        justifyContent:"center",
        width:50,
        height:50,
        backgroundColor:"#ff00ff",//i dont need such markers?
    },
    marker:{
        width:30,
        height:30,
    },
    searchCont:{
        position:"absolute",
        width:"100%",
        top:5,
        left:0,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        paddingVertical:3,
        gap:10,
    },
    horizScrollCont:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
    },
    category:{
        display:"flex",
        flexDirection:"row",
        gap:5,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#ffffff",
        paddingHorizontal:7,
        paddingVertical:7,
        borderRadius:7,
        marginRight:20,
        shadowOpacity:0.15,
        shadowRadius:7.5,
        elevation:5,
    },
    allplaces:{
        width:"100%",


    },
    placeView:{
        width:CARD_WIDTH,
        height:215,
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
    searchField:{
        width:'80%',
        backgroundColor:"#fafafa",
        borderColor:"#d3d6db",
        borderWidth:2,
        shadowOpacity:0.15,
        shadowRadius:7.5,
        elevation:5,
        height:50,
        display:"flex",
        paddingHorizontal:10,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-between",
        borderRadius:30,
    },
    ButtonsCont:{
        width:'100%',
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        paddingVertical:5,
        paddingHorizontal:20,
        gap:20,
        
    } ,
    Button:{
        width:'50%',
        paddingVertical:7,
        paddingHorizontal:20 ,
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        borderRadius:10,
        flexDirection:"row",
    },
    placeTitleCont:{
        width:"100%",
        display:"flex",
        alignItems:"flex-start",
        justifyContent:"center",

    },
    placeTitle:{
      fontSize:17,
      fontWeight: 'bold',
        
    },
    sliderIconCont:{
        backgroundColor:"#fafafa",
        padding:10,
        borderRadius:10,
        borderColor:"#d3d6db",
        borderWidth:2,
        shadowOpacity:0.15,
        shadowRadius:7.5,
        elevation:5,
    },
    contentContainer:{
        height:"100%",
        display:"flex",
        flexDirection:"column",
        width:"100%",
        paddingHorizontal:15,
        paddingVertical:10,


    },
    title:{
        fontSize:20,
        fontWeight:"bold",
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

export default observer(Map);