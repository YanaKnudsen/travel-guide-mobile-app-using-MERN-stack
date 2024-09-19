import store from "../services/mobx/AppDataStore.ts";
import Geolocation from "react-native-geolocation-service";

export function getContiniousLocation(setIsLocationObtained:Function){
    if (store.hasLocationPermission) {
        Geolocation.watchPosition(//getCurrentPosition, opt timeout: 15000,
            (position) => {
                store.setCurrentPosition(position);
                store.setCurrentLat(position.coords.latitude);
                store.setCurrentLong(position.coords.longitude);
                store.setMyLocation([{
                    _id:"mylocation",
                    name:"My location",
                    location:[position.coords.latitude,position.coords.longitude]
                }]);
                console.log("position is changed");
                console.log(store.currentLat);
                console.log(store.currentLong);
                setIsLocationObtained(true);
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true,distanceFilter:100,
                interval: 10000,fastestInterval: 5000, // Fastest possible interval (in milliseconds)
                forceRequestLocation: true,
                showLocationDialog: true, // Minimum time interval between location updates (in milliseconds)
             }
        );
    }
}

const startTracking = () => {
    Geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            console.log(`New location: ${latitude}, ${longitude}`);
        },
        (error) => {
            console.error(error);
        },
        {
            distanceFilter: 50, // This will trigger the callback every 50 meters
            enableHighAccuracy: true,
            interval: 10000,  // Minimum time interval between location updates (in milliseconds)
            fastestInterval: 5000, // Fastest possible interval (in milliseconds)
            forceRequestLocation: true,
            showLocationDialog: true,
        }
    );
};