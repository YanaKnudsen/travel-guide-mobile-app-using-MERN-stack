import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View, ImageBackground,
    ActivityIndicator,
} from 'react-native';
import store from "../services/mobx/AppDataStore.ts";
import {observer} from "mobx-react";
import  {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import BottomSheet from "../components/ui/BottomSheet.tsx";
import PlacesCarousel from "../features/Places/PlacesCarousel.tsx";

import {CitiesModel} from "../@types/CitiesModel.ts";
import {FetchPlaces} from "../services/api/fetchPlaces.ts";
import {FetchCities} from "../services/api/fetchCities.ts";
import {chooseCategories} from "../actions/filterPlaces.ts";
import FilterContent from "../features/Filter/Filter.tsx";
import FilterButton from "../features/Filter/FilterButton.tsx";
import SearchField from "../features/Search/Search.tsx";
import CitiesCarousel from "../features/Cities/CitiesCarousel.tsx";


function PlacesList({route,navigation}): React.JSX.Element {

    if (route.params)
    {const {categoryList} = route.params;
        useEffect(() => {
           Object.keys(store.chosenCategories).forEach(function(key, value) {
               return store.chosenCategories[key] = false;
            })
            chooseCategories(categoryList);
        }, [categoryList]);}


    const [places,setPlaces]=useState([]);
    const [loading,setLoading]=useState(false);
    const [searchString,setSearchString]=useState("");
    const [cities,setCities]=useState(Array<CitiesModel>);

    useEffect(()=>{
        FetchPlaces(searchString,store.chosenCity,store.initradius,store.chosenCategories,5,setLoading,setPlaces,places,false);
        FetchCities(searchString,5,setLoading,setCities,cities,false);

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
            FetchPlaces(searchString,store.chosenCity,store.radius,store.chosenCategories,5,setLoading,setPlaces,places,false);
            return
        }
            FetchPlaces(searchString,store.chosenCity,store.radius,store.chosenCategories,5,setLoading,setPlaces,places,false);
            FetchCities(searchString,5,setLoading,setCities,cities,false);

    },[searchString]);

    //filter places
    useEffect(()=>{
        FetchPlaces(searchString,store.chosenCity,store.radius,store.chosenCategories,5,setLoading,setPlaces,places,false);
    },[store.chosenCity]);

    useEffect(()=>{
        FetchPlaces(searchString,store.chosenCity,store.radius,store.chosenCategories,5,setLoading,setPlaces,places,false);
    },[store.radius]);

    useEffect(()=>{
        FetchPlaces(searchString,store.chosenCity,store.radius,store.chosenCategories,5,setLoading,setPlaces,places,false);
    },[store.chosenCategories]);



    function NavigateToPlacePage(marker){
        navigation.navigate('PlacePage',{placeObj: marker});
    }


    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
   // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);



    return (
        <ImageBackground source={require("../../assets/backgrounds/dalaWallPaper.png")} resizeMode="cover" imageStyle={{opacity:0.3,height:'100%',}}>
            <SafeAreaView style={styles.mainCont}>
                <BottomSheetModalProvider>
            <View style={{width:'100%',display:"flex",justifyContent:"space-between",alignItems:"center",paddingHorizontal:20,paddingVertical:10,flexDirection:"row"}}>
                <SearchField value={searchString} setValue={setSearchString}/>
                <FilterButton onClick={handlePresentModalPress}/>
            </View>
            <CitiesCarousel data={cities} onEndReached={onEndReachedCities} setSearchString={setSearchString}/>
                    {loading?(
                        <View style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",alignSelf:"center",height:"80%"}}>
                        <ActivityIndicator size="large" color="#EA5D5C" />
                        </View>):
                        (<PlacesCarousel data={places} onEndReached={onEndReachedPlaces} NavigateToPlacePage={NavigateToPlacePage}/>)}

                    <BottomSheet ref={bottomSheetModalRef}>
                       <FilterContent/>
                    </BottomSheet>

            </BottomSheetModalProvider>
        </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({


    mainCont:{
     //   backgroundColor:'#e7e6e1',
        height:'100%',
    },
    scrollCont:{
        paddingHorizontal:20,
        paddingVertical:10,
        height:'100%',
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


});

export default observer(PlacesList);