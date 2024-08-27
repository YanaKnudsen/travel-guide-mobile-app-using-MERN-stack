import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    Button,
    Image,
    FlatList,
    TouchableOpacity,
    View, ImageBackground, TextInput,
    ActivityIndicator, Dimensions,
    RefreshControl,
} from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import store from "../services/mobx/AppDataStore.ts";
import SearchField from "../components/search/SearchField.tsx";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6.js";
import AxiosInstance from "../axios/AxiosInstance.tsx";
import {observer} from "mobx-react";
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import DisplayCategories from "../components/categories/DisplayCategories.tsx";
import BouncyCheckbox from "react-native-bouncy-checkbox"
import Checkbox from "../components/filter/Checkbox.tsx";
import ThinLine from "../components/decorations/ThinLine.tsx";
import {CitiesModel} from "../@types/CitiesModel.ts";
import CheckboxCategory from "../components/filter/CheckboxCategory.tsx";
import {CategoriesModel} from "../@types/CategoriesModel.ts";
import {PERMISSIONS, request, RESULTS} from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
const {height, width} = Dimensions.get('window')
const itemPerPage=4;

function PlacesList({route,navigation}): React.JSX.Element {

    const chooseCategories=(categoryList:Array<string>)=>{
        for (let category of categoryList) {
            if (store.chosenCategories[category]) {
                store.setChosenCategories({...store.chosenCategories, [category]: false})
            } else {
                store.setChosenCategories({...store.chosenCategories, [category]: true})
            }
        }

    }
    if (route.params)
    {const {categoryList} = route.params;
        useEffect(() => {
           Object.keys(store.chosenCategories).forEach(function(key, value) {
               return store.chosenCategories[key] = false;
            })
            console.log("here")
            chooseCategories(categoryList);
            showPlaces()
        }, [categoryList]);}


    const [places,setPlaces]=useState([]);
    const [numberOfPlaces,setNumberOfPlaces]=useState(0);
    const [numberOfCities,setNumberOfCities]=useState(0);
    const [loading,setLoading]=useState(false);
    const [searchString,setSearchString]=useState("");
    const [cities,setCities]=useState(Array<CitiesModel>);
    const[cityIsChosen,setCityIsChosen]=useState(false);
    const [isRefreshing, setRefreshing] = useState(false);

    useEffect(()=>{

        showPlaces();
        showCities();

    },[]);

    //show initial cities , to-do: add limit param to frontend for both func
    //to-do make cities alphabetic order
    async function showCities(){
        setLoading(true);
        let offset=0;
        setCities([]);
        AxiosInstance.post('/searchCity',{offset:offset,searchString:searchString})
            .then(res => {
                //store.setPlaces(res.data);
                setCities(res.data);
                setCities([...store.myLocation,...res.data]);
                setLoading(false);
            })
            .catch(err => {
                // Handle errors
                console.error(err);
            });
    }
//load initial places
    async function showPlaces(){
        setLoading(true);
        let offsetPlace=0;
        setPlaces([]);
        AxiosInstance.post('/paginatePlaces',{offset:offsetPlace,searchString:searchString,chosenCity:store.chosenCity,radius:store.radius,activeCategories:store.chosenCategories,limit:5})
            .then(res => {
                setPlaces(res.data);
                setLoading(false);
            })
            .catch(err => {
                // Handle errors
                console.error(err);
            });
    }


    async function fetchNextPage(){
            AxiosInstance.post('/paginatePlaces',{offset:places.length,numOfPlaces:numberOfPlaces,searchString:searchString,chosenCity:store.chosenCity,radius:store.radius,activeCategories:store.chosenCategories,limit:5,})
                .then(res => {
                    setPlaces([...places,...res.data]);
                    setRefreshing(false);
                })
                .catch(err => {
                    // Handle errors
                    console.error(err);
                });

//ask ihar if pagination implemented right?

    }

    async function fetchNextCities(){
        AxiosInstance.post('/searchCity',{offset:cities.length,searchString:searchString})
            .then(res => {
                setCities([...cities,...res.data]);
            })
            .catch(err => {
                // Handle errors
                console.error(err);
            });
//ask ihar if pagination implemented right?

    }

    useEffect(()=>{
       // if (store.chosenCity==null && searchString.length>0){
       //     showCities();
      //      return;
     //   }
        showPlaces();
        showCities();

    },[searchString]);

    useEffect(()=>{
        showPlaces();

    },[store.chosenCategories]);


    const requestPermission=()=>{
        request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log(
                        'This feature is not available (on this device / in this context)',
                    );
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
    };

    const getContiniousLocation = () => {
        if (store.hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    store.setCurrentPosition(position);
                    store.setCurrentLat(position.coords.latitude);
                    store.setCurrentLong(position.coords.longitude);
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000,distanceFilter:10000 }
            );
        }
    };


    async function chooseCity(city:CitiesModel){
        if (city._id=="mylocation"){
            console.log("here")
            console.log(store.hasLocationPermission);
            if (store.hasLocationPermission){
                store.setChosenCity(city);
                store.setRadius(10000);
                return;
            }
            else{
                requestPermission();
                return;
            }
        }
        store.setChosenCity(city);
        store.setRadius(10000);
    }

    function unchooseCity(){
        store.setChosenCity(null);

        store.setRadius(store.initradius);
        setSearchString("");
        console.log(store.chosenCity);
    }

    useEffect(()=>{
        showPlaces();
    },[store.chosenCity]);

    const chooseRadius=(radius:number)=>{
        if (store.radius==radius)
        {
            store.setRadius(store.initradius);
        }
        else{
            store.setRadius(radius);
        }

    }



    useEffect(()=>{
        showPlaces();
    },[store.radius]);





    function NavigateToPlacePage(marker){
        navigation.navigate('PlacePage',{placeObj: marker});
    }
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '90%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <ImageBackground source={require("../../assets/backgrounds/dalaWallPaper.png")} resizeMode="cover" imageStyle={{opacity:0.3,height:'100%',}}>
            <SafeAreaView style={styles.mainCont}>
                <BottomSheetModalProvider>
            <View style={{width:'100%',display:"flex",justifyContent:"space-between",alignItems:"center",paddingHorizontal:20,paddingVertical:10,flexDirection:"row"}}>
                <View style={styles.searchField} >
                    <TextInput style={{width:'85%',height:'100%',}}
                               placeholder={store.chosenCity?.name != null ? `${store.chosenCity.name}`: "Find places..."}
                               onChangeText={text => setSearchString(text)}
                               value={searchString}/>
                    <FontAwesome6 name="magnifying-glass" size={15} />
                </View>
                <TouchableOpacity style={[styles.sliderIconCont,{borderColor:  (Object.values(store.chosenCategories).includes(true) || store.radius!=store.initradius) ? "#EA5D5C":"#d3d6db"}]} onPress={handlePresentModalPress}>
                    <FontAwesome5 name="sliders-h" size={25} />
                </TouchableOpacity>
            </View>
            <View style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <FlatList
                        horizontal
                        data={cities}
                        scrollEventThrottle={1}
                        showsHorizontalScrollIndicator={false}
                        style={styles.horizScrollCont}
                        onEndReached={fetchNextCities} //show next page
                        contentInset={{
                            top:0,
                            left:10,
                            bottom:0,
                            right:10,
                        }}
                        contentOffset={{x: -10, y: 0}}
                        renderItem={({item,index }) => {
                            return(
                                <TouchableOpacity style={[styles.city,{borderColor: (store.chosenCity?.name==item.name)?"#000000":"#d8d7d7", paddingHorizontal:(store.chosenCity?.name==item.name)?15:7, height:(store.chosenCity?.name==item.name)?45:35}]} onPress={()=>chooseCity(item)}>
                                    <View style={{position:"absolute",top:0,right:0,paddingVertical:5,paddingHorizontal:5,height:'100%',width:'100%',display:"flex"}}>
                                        {(store.chosenCity?.name==item.name) &&
                                            <TouchableOpacity onPress={unchooseCity} style={{height:'100%',display:"flex",alignItems:"flex-end"}}>
                                                <FontAwesome6 name="xmark" size={10}/>
                                            </TouchableOpacity>}
                                    </View>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>

                            )
                        }}
                    />

            </View>
                    {loading?(
                        <View style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",alignSelf:"center",height:"80%"}}>
                        <ActivityIndicator size="large" color="#EA5D5C" />
                        </View>):
                        ( <FlatList
                style={styles.scrollCont}
                data={places}
                onEndReached={fetchNextPage} //show next page
                onEndReachedThreshold={0.8}//0.8
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
            />)}
                <View style={styles.container}>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                    >
                        <BottomSheetView style={styles.contentContainer}>
                            <View style={{width:"100%",paddingHorizontal:15,paddingVertical:10,display:"flex",justifyContent:"center",alignItems:"center",gap:5,}}>
                                <Text style={styles.title}>Filters</Text>
                                <ThinLine/>
                            </View>
                            <View style={{display:"flex",flexDirection:"column",gap:10,}}>
                                <View style={{display:"flex",flexDirection:"column",gap:10,}}>
                                    <Text style={styles.title}>Categories</Text>
                                  <View style={{flexDirection: 'row', flexWrap: 'wrap',gap:10,}}>
                                      <CheckboxCategory name={"Swedish fika"} category={"fika"} onClick={()=>chooseCategories(["fika"])}/>
                                      <CheckboxCategory name={"Restaurants"} category={"restaurants"} onClick={()=>chooseCategories(["restaurants"])}/>
                                      <CheckboxCategory name={"Shops"} category={"shops"} onClick={()=>chooseCategories(["shops"])}/>
                                      <CheckboxCategory name={"Attractions"} category={"attractions"} onClick={()=>chooseCategories(["attractions"])}/>
                                      <CheckboxCategory name={"To do"} category={"toDo"} onClick={()=>chooseCategories(["toDo"])}/>
                                      <CheckboxCategory name={"Accommodation"} category={"accommodation"} onClick={()=>chooseCategories(["accommodation"])}/>
                                      <CheckboxCategory name={"Camping"} category={"camping"} onClick={()=>chooseCategories(["camping"])}/>
                                  </View>
                                </View>
                                <View style={{display:"flex",flexDirection:"column",gap:10,}}>
                                    <Text style={styles.title}>Distance</Text>
                                    <View style={{flexDirection: 'row', flexWrap: 'wrap',gap:10,}}>
                                        <Checkbox name={"10 km"} onClick={()=>chooseRadius(10000)}/>
                                        <Checkbox name={"20 km"} onClick={()=>chooseRadius(20000)}/>
                                        <Checkbox name={"50 km"} onClick={()=>chooseRadius(50000)}/>
                                        <Checkbox name={"100 km"} onClick={()=>chooseRadius(100000)}/>
                                    </View>
                                </View>


                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({

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
    mainCont:{
     //   backgroundColor:'#e7e6e1',
        height:'100%',
    },
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
    category:{
        width:30,
        height:30,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5,
    },
    filterCont:{

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
    contentContainer:{
        height:"100%",
        display:"flex",
        flexDirection:"column",
        width:"100%",
        paddingHorizontal:15,
        paddingVertical:10,


    },
    categoryCheck:{
       width:"45%",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        backgroundColor:"#ff00ff",
        gap:5,
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
    },
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

export default observer(PlacesList);