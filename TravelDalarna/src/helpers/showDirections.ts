import store from "../services/mobx/AppDataStore.ts";
import {showLocation} from "react-native-map-link";

export function showDirections(placeLat:number,placeLong:number){

    showLocation({
        latitude: placeLat ,
        longitude: placeLong,
        sourceLatitude:store.currentLat, // optionally specify starting location for directions
        sourceLongitude: store.currentLong,
    });

}