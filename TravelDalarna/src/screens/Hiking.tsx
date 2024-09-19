import React, {useCallback, useEffect, useMemo, useRef, useState,Component} from 'react';
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
import { observer } from "mobx-react";
import {Marker} from 'react-native-maps';
import store from "../services/mobx/AppDataStore.ts";
import MapView, {Polyline} from "react-native-maps";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
const INITIAL_REGION = {
    latitude: 60.48473081560262,
    longitude: 15.43118044828889,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
};
import { parseGPXWithCustomParser, stringifyGPX} from "@we-gold/gpxjs"
import { DOMParser, XMLSerializer } from "xmldom-qsa"
var RNFS = require('react-native-fs');


export interface point {
    latitude: number;
    longitude:number;
}



function Hiking({route,navigation}): React.JSX.Element {
    const [positions,setPositions]=useState(Array<point>);
    async function showGPX(){
        const filePath = "/Users/yanaknudsen/DalaApp2/dalaapp/TravelDalarna/src/screens/slattvala.gpx";
        await RNFS.readFile( filePath ).then((file:string)=>{
            const customParseMethod = (txt: string): Document | null => {
                return new DOMParser().parseFromString(txt, "text/xml")
            }
            const [parsedFile, error] = parseGPXWithCustomParser(
                file,
                customParseMethod
            )
            parsedFile?.tracks[0].points.map(p =>{
                 //   positions.push( {latitude: p.latitude, longitude: p.longitude})
                const newPosition:Array<point>=[{latitude: p.latitude, longitude: p.longitude}];
                setPositions(prevPositions=>[...prevPositions,...newPosition]);

            });
        // const xml = stringifyGPX(parsedFile, new XMLSerializer());
             })



    }

    useEffect(() => {
        showGPX();
        console.log("done");
    }, []);

    useEffect(() => {

    }, [positions]);




    return (
        <View style={{width:"100%",height:"100%",display:"flex",flexDirection:"column" }}>
                <MapView
                    style={styles.map}
                    region={INITIAL_REGION}
                >
                    <Polyline
                        coordinates={positions}// fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={16}
                    />
                </MapView>


        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

});

export default observer(Hiking);