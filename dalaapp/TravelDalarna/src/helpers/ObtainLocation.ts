import store from "../services/mobx/AppDataStore.ts";
import Geolocation from "react-native-geolocation-service";

export function getContiniousLocation(setIsLocationObtained:Function){
    if (store.hasLocationPermission) {
        Geolocation.getCurrentPosition(
            (position) => {
                store.setCurrentPosition(position);
                store.setCurrentLat(position.coords.latitude);
                store.setCurrentLong(position.coords.longitude);
                store.setMyLocation([{
                    _id:"mylocation",
                    name:"My location",
                    location:[position.coords.latitude,position.coords.longitude]
                }]);
                setIsLocationObtained(true);
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000,distanceFilter:10000 }
        );
    }
}
