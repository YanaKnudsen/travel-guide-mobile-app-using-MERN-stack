import React, {useEffect,useState,useContext} from 'react';
import {
    SafeAreaView,
    ImageBackground,
    StyleSheet,
    Text,
    Image,
    ActivityIndicator,
    View, TouchableOpacity, FlatList, Dimensions,Alert, Modal, Pressable,
} from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import store, {AppDataStoreStoreContext} from "../services/mobx/AppDataStore.ts";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6.js";
import { observer } from "mobx-react";
const { width} = Dimensions.get('window')
const CARD_WIDTH=width*0.8;
const offsetRight=width/2-CARD_WIDTH/2
import {FetchPlaces} from "../services/api/fetchPlaces.ts";
import {requestPermission} from "../helpers/LocationPermission.ts";
import {getContiniousLocation} from "../helpers/ObtainLocation.ts";
import {chooseCategories} from "../actions/filterPlaces.ts";
import SplashScreen from 'react-native-splash-screen';


function Home({route,navigation}): React.JSX.Element {
    const {
        setModalIsShown,
        modalIsShown,
    } = useContext(AppDataStoreStoreContext);
    const [places,setPlaces]=useState([]);
    const [loading,setLoading]=useState(false);
    const [isLocationObtained,setIsLocationObtained]=useState(false);
    const [modalVisible,setModalVisible]=useState(false);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            store.setChosenCategories(store.initChosenCategories);
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);


    React.useEffect(() => {
        store.setChosenCategories(store.initChosenCategories);
        store.setChosenCity(null);
        store.setRadius(store.initradius)
        store.setPreviousPage(route.name);
    }, [navigation]);

    //request permission
    useEffect(() => {

        const initStore = async () => {
            await store.hydrateStore();
        }

        initStore()
            .then(() => {
                SplashScreen.hide();
                console.log("starting request permission")
                requestPermission().then(() => {
                    console.log("showing modal")
                    console.log("shown",store.modalIsShown)
                    if(store.modalIsShown){
                        setModalVisible(false);
                    }
                    else{
                        console.log("here");
                        setModalVisible(true);
                    }
                });
            })


    }, []);

    function closeModal(){
          setModalVisible(false);
          store.setModalIsShown(true);
    }

    useEffect(() => {
        console.log("switched to home");
    }, [route.name]);

    //obtain location if permission is true otherwise show ten first places in the database
    useEffect(() => {
        store.hasLocationPermission?getContiniousLocation(setIsLocationObtained):FetchPlaces("",null,store.initradius,null,10,setLoading,setPlaces,places,false);
    }, [store.hasLocationPermission]);

    //when location is obtained show ten nearest places
    useEffect(() => {
        FetchPlaces("",store.myLocation[0],store.initradius,null,10,setLoading,setPlaces,places,false);

    }, [isLocationObtained]);


    //update places when location is changed
  useEffect(() => {
      FetchPlaces("",store.myLocation[0],store.initradius,null,10,setLoading,setPlaces,places,false);
    }, [store.myLocation]);



    //choose category and navigate to the places list
    function NavigateToPlacesList(categoryList:Array<string>){
       // store.setPlacesFlag(true);
       /// store.setHomeFlag(false);
     //   store.setMapFlag(false);
      //  navigation.navigate('Places',{categoryList: categoryList});
        //to-do: make var here wich indicates thet nav coming throg cat choice
        chooseCategories(categoryList);
        navigation.navigate('Places');
    }

    //navigate to place page
    function NavigateToPlacePage(marker){
        navigation.navigate('PlacePage',{placeObj: marker});
    };


    return (
        <View style={{backgroundColor:'#000000',}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Dear user,</Text>
                        <Text style={styles.modalText}></Text>
                        <Text style={styles.modalText}>This app is in development, with many places yet to be added. We'll update it regularly with new locations and features. Feedback is welcome at feedback@qnudsen.com.</Text>
                        <Pressable
                            style={styles.button}
                            onPress={closeModal}>
                            <Text style={styles.modalText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <ImageBackground source={require("../../assets/backgrounds/forest.png")} resizeMode="cover" imageStyle={{opacity:0.5}}>
        <SafeAreaView style={styles.mainView}>
            <View >

                <View style={styles.categoriesContainer}>
                    <Text style={[styles.sectionTitle,{marginBottom:10}]}>Explore Dalarna</Text>
                    <View style={styles.categoriesRow}>
                       <TouchableOpacity style={[styles.categorie,{backgroundColor: '#FFF2B5'}]} onPress={()=>NavigateToPlacesList(["restaurants","fika"])}>
                           <FontAwesome5 name="utensils" size={30} />
                           <View style={styles.categorieText}>
                           <Text style={styles.upperCase}>Food</Text>
                           </View>
                       </TouchableOpacity>
                        <TouchableOpacity  style={[styles.categorie,{backgroundColor: "#B5F5D2"}]} onPress={()=>NavigateToPlacesList(["shops"])}>
                            <FontAwesome5 name="shopping-cart" size={30} />
                            <View style={styles.categorieText}>
                                <Text style={styles.upperCase}>Shops</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.categorie,{backgroundColor: '#A7D8F0'}]} onPress={()=>NavigateToPlacesList(["attractions"])}>
                            <FontAwesome5 name="eye" size={30} />
                            <View style={styles.categorieText}>
                            <Text style={styles.upperCase}>Attractions</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.categoriesRow}>
                        <TouchableOpacity  style={[styles.categorie,{backgroundColor: '#F9C2D1'}]} onPress={()=>NavigateToPlacesList(["toDo"])}>
                            <FontAwesome6 name="masks-theater" size={30} />
                            <View style={styles.categorieText}>
                            <Text style={styles.upperCase}>To do</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity  style={[styles.categorie,{backgroundColor: '#CBBEEB'}]} onPress={()=>NavigateToPlacesList(["accommodation"])}>
                            <FontAwesome5 name="bed" size={30} />
                            <View style={styles.categorieText}>
                                <Text style={styles.upperCase}>Hotels</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.categorie,{backgroundColor: '#FFD5B5'}]} onPress={()=>NavigateToPlacesList(["camping"])}>
                            <FontAwesome5 name="caravan" size={30} />
                            <View style={styles.categorieText}>
                            <Text style={styles.upperCase}>Camping</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categoriesRow}>
                        <TouchableOpacity style={styles.bigButton} onPress={()=>NavigateToPlacesList([])}>
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
                        const image_uri = "https://dala.app.qnudsen.com/uploads/" + item.id + "/" + item.photos[0];
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
                        const image_uri = "https://dala.app.qnudsen.com/uploads/" + item.id + "/" + item.photos[0];
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

                                    </View>
                                </View>


                            </TouchableOpacity>

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

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        width:"90%",
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        textAlign:"center",
    },
    modalText:{
        fontSize:17,
        textAlign:"center",
    },
    button:{
        paddingVertical:10,
        paddingHorizontal:15,
        backgroundColor:"#B2EAB7",
        marginTop:20,
        borderRadius:10,
    }

});

export default observer(Home);