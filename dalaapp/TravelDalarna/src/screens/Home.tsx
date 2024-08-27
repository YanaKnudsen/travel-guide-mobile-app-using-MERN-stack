import React, {useEffect,useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
    SafeAreaView,
    ScrollView,
    ImageBackground,
    StyleSheet,
    Text,
    Image,
    useColorScheme,
    ActivityIndicator,
    View, Animated, TouchableOpacity, FlatList, Dimensions,
} from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AxiosInstance from "../axios/AxiosInstance.tsx";
import store from "../services/mobx/AppDataStore.ts";
import {check, PERMISSIONS, RESULTS,request} from 'react-native-permissions';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6.js";
import PlacesCarousel from "../components/carousels/horizontal/PlacesCarousel.tsx";
import { observer } from "mobx-react";
import GetLocation from 'react-native-get-location';
import Geolocation from 'react-native-geolocation-service';
import {CategoriesModel} from "../@types/CategoriesModel.ts";
import DisplayCategories from "../components/categories/DisplayCategories.tsx";
const {height, width} = Dimensions.get('window')
const CARD_WIDTH=width*0.8;
const offsetRight=width/2-CARD_WIDTH/2

function Home({navigation}): React.JSX.Element {

    const [places,setPlaces]=useState([]);
    const [loading,setLoading]=useState(false);


    useEffect(() => {
        requestPermission();
        store.setRadius(10000);
        showPlaces();
    }, []);

    useEffect(() => {
        showPlaces();
    }, [store.myLocation]);

    useEffect(() => {
        showPlaces();
    }, [store.chosenCity]);



    useEffect(() => {
        store.setCurrentLat(store.currentPosition?.coords.latitude);
        store.setCurrentLong(store.currentPosition?.coords.longitude);
        console.log("position changed to ");
        console.log(store.currentLat);
        console.log(store.currentLong);
    }, [store.currentPosition]);


    const getContiniousLocation = () => {
        if (store.hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    store.setCurrentPosition(position);
                    store.setCurrentLat(position.coords.latitude);
                    store.setCurrentLong(position.coords.longitude);
                    store.setMyLocation([{
                        _id:"mylocation",
                        name:"My location",
                        location:[position.coords.latitude,position.coords.longitude]
                    }]);
                    console.log("chosen city",store.chosenCity)
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000,distanceFilter:10000 }
            );
        }
    };


    const requestPermission=()=>{
        request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log(
                        'This feature is not available (on this device / in this context)',
                    );
                    showPlaces();
                    break;
                case RESULTS.DENIED:
                    console.log(
                        'The permission has not been requested / is denied but requestable',
                    );
                    break;
                case RESULTS.GRANTED:
                    console.log('The permission is granted');
                    store.setHasLocationPermission(true);
                    console.log(store.hasLocationPermission);
                    getContiniousLocation();
                    break;
                case RESULTS.BLOCKED:
                    console.log('The permission is denied and not requestable anymore');
                    break;
            }
        });
    }

    function showFilteredList(categoryList:Array<string>){
       NavigateToPlacesList(categoryList);
    }

    function NavigateToPlacesList(categoryList){
        store.setPlacesFlag(true);
        store.setHomeFlag(false);
        store.setMapFlag(false);
        navigation.navigate('Places',{categoryList: categoryList});
    }

    async function showPlaces(){
        setLoading(true);
        let offsetPlace=0;
        setPlaces([]);
        AxiosInstance.post('/paginatePlaces',{offset:offsetPlace,searchString:"",radius:10000,chosenCity:store.myLocation[0],limit:10})
            .then(res => {
                setPlaces(res.data);
                setLoading(false);
            })
            .catch(err => {
                // Handle errors
                console.error(err);
            });
    }
    function NavigateToPlacePage(marker){
        navigation.navigate('PlacePage',{placeObj: marker});
    };


    return (
        <View style={{backgroundColor:'#000000',}}>
            <ImageBackground source={require("../../assets/backgrounds/forest.png")} resizeMode="cover" imageStyle={{opacity:0.5}}>
        <SafeAreaView style={styles.mainView}>
            <View >

                <View style={styles.categoriesContainer}>
                    <Text style={[styles.sectionTitle,{marginBottom:10}]}>Explore Dalarna</Text>
                    <View style={styles.categoriesRow}>
                       <TouchableOpacity style={[styles.categorie,{backgroundColor: '#f0f1b3'}]} onPress={()=>showFilteredList(["restaurants","fika"])}>
                           <FontAwesome5 name="utensils" size={30} />
                           <View style={styles.categorieText}>
                           <Text style={styles.upperCase}>Food</Text>
                           </View>
                       </TouchableOpacity>
                        <TouchableOpacity  style={[styles.categorie,{backgroundColor: '#bae2be'}]} onPress={()=>showFilteredList(["shops"])}>
                            <FontAwesome5 name="shopping-cart" size={30} />
                            <View style={styles.categorieText}>
                                <Text style={styles.upperCase}>Shops</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.categorie,{backgroundColor: '#c5e5e3'}]} onPress={()=>showFilteredList(["attractions"])}>
                            <FontAwesome5 name="eye" size={30} />
                            <View style={styles.categorieText}>
                            <Text style={styles.upperCase}>Attractions</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.categoriesRow}>
                        <TouchableOpacity  style={[styles.categorie,{backgroundColor: '#ffd3b6'}]} onPress={()=>showFilteredList(["toDo"])}>
                            <FontAwesome6 name="masks-theater" size={30} />
                            <View style={styles.categorieText}>
                            <Text style={styles.upperCase}>To do</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity  style={[styles.categorie,{backgroundColor: '#93e4c1'}]} onPress={()=>showFilteredList(["accommodation"])}>
                            <FontAwesome5 name="bed" size={30} />
                            <View style={styles.categorieText}>
                                <Text style={styles.upperCase}>Hotels</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.categorie,{backgroundColor: '#fdc57b'}]} onPress={()=>showFilteredList(["camping"])}>
                            <FontAwesome5 name="caravan" size={30} />
                            <View style={styles.categorieText}>
                            <Text style={styles.upperCase}>Camping</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categoriesRow}>
                        <TouchableOpacity style={styles.bigButton} onPress={()=>showFilteredList([])}>
                            <Text style={[styles.upperCase,styles.bigFont]}>All places</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


                {store.hasLocationPermission && <View style={styles.recos}>
                    { loading ? (
                        <View style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center",bottom:10,}}>
                            <ActivityIndicator size="large" color="#EA5D5C" />
                        </View>):(
<>
                        <Text style={[styles.sectionTitle,{color:'#000000',paddingHorizontal:20,}]}>Nearby places</Text>
                    <FlatList
                    data={places}
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    style={{paddingVertical: 15}}
                    contentInset={{
                        top: 0,
                        left: offsetRight,
                        bottom: 0,
                        right: offsetRight,
                    }}
                    contentOffset={{x: -offsetRight, y: 0}}
                    pagingEnabled
                    snapToInterval={CARD_WIDTH + 10}
                    snapToAlignment="center"
                    renderItem={({item, index}) => {
                        const image_uri = "http://localhost:4000/uploads/" + item.id + "/" + item.photos[0];
                        return (
                            <TouchableOpacity style={styles.placeView} key={index} onPress={()=>NavigateToPlacePage(item)}>
                                <View style={{width: "100%",}}>
                                    <View style={styles.placeImage}>
                                        <Image
                                            style={{width: '100%', height: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10,}}
                                            source={{uri: image_uri}}/>
                                    </View>
                                    <View
                                        style={{paddingHorizontal: 20, paddingVertical: 5, display: "flex", flexDirection: "column", gap: 5,}}>

                                        <View style={styles.placeTitleCont}>
                                            <Text style={styles.placeTitle}>{item.title}</Text>
                                        </View>

                                        <View>
                                            {store.hasLocationPermission && <Text style={{color: "#565656"}}>{item.dist/1000} km</Text>}
                                        </View>
                                    </View>
                                </View>


                            </TouchableOpacity>

                        )
                    }}

                />
    </>)}
                    </View>}

                {!store.hasLocationPermission && <View style={styles.recos}>
                    {  loading ?(
                        <View style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center",bottom:10,}}>
                            <ActivityIndicator size="large" color="#EA5D5C" />
                        </View>):
                    (
<>
                        <Text style={[styles.sectionTitle,{color:'#000000',paddingHorizontal:20,}]}>Discover places</Text>
                    <FlatList
                    data={places}
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    style={{paddingVertical: 15}}
                    contentInset={{
                        top: 0,
                        left: offsetRight,
                        bottom: 0,
                        right: offsetRight,
                    }}
                    contentOffset={{x: -offsetRight, y: 0}}
                    pagingEnabled
                    snapToInterval={CARD_WIDTH + 10}
                    snapToAlignment="center"
                    renderItem={({item, index}) => {
                        const image_uri = "http://localhost:4000/" + item.id + "/" + item.photos[0];
                        return (
                            <View style={styles.placeView} key={index}>
                                <View style={{width: "100%",}}>
                                    <View style={styles.placeImage}>
                                        <Image
                                            style={{width: '100%', height: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10,}}
                                            source={{uri: image_uri}}/>
                                    </View>
                                    <View
                                        style={{paddingHorizontal: 20, paddingVertical: 5, display: "flex", flexDirection: "column", gap: 5,}}>

                                        <View style={styles.placeTitleCont}>
                                            <Text style={styles.placeTitle}>{item.title}</Text>
                                        </View>

                                        <View>
                                            <Text style={{color: "#565656"}}>{item.dist/1000} km</Text>
                                        </View>
                                    </View>
                                </View>


                            </View>

                        )
                    }}

                />
                        </>)}
                    </View>}







        </SafeAreaView>
                </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({

    mainView:{
      height:'100%',
      width :'100%',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color:'#ffffff',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },

    categoriesContainer:{
        width:'100%',
        display:"flex",
        flexDirection:"column",
        gap:10,
        paddingHorizontal:20,
        paddingVertical:30,
        height:'60%',

    },
    categoriesRow:{
        width:'100%',
        display:"flex",
        flexDirection:"row",
        gap:10,
        justifyContent:"space-between",
        alignItems:"center",

    },
    categorie:{
        width:'30%',
        height:100,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        gap:7,
    },
    categorieText:{
        width:'100%',
        justifyContent:"center",
        alignItems:"center",
    },
    bigButton:{
        width:'100%',
        height:50,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        backgroundColor:'#e7e6e1'
    },
    recos:{
      height:'40%',
      width:'100%',
      backgroundColor:'#e7e6e1',
      display:'flex',
        justifyContent:"flex-start",
        paddingRight:0,
        paddingTop:10,

    },
    carousel:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    upperCase:{
        textTransform: 'uppercase',
    },
    bigFont:{

         fontSize:17,
    },
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
    placeTitle:{
        fontSize:15,
        fontWeight:"bold",
    },

});

export default observer(Home);