import {PERMISSIONS, request, RESULTS} from "react-native-permissions";
import store from "../services/mobx/AppDataStore.ts";

export async function requestPermission(){
    await request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
        switch (result) {
            case RESULTS.UNAVAILABLE:
                console.log(
                    'This feature is not available (on this device / in this context)',
                );
                store.setHasLocationPermission(false);
                break;
            case RESULTS.DENIED:
                console.log(
                    'The permission has not been requested / is denied but requestable',
                );
               store.setHasLocationPermission(false);
                break;
            case RESULTS.GRANTED:
                console.log('The permission is granted');
                store.setHasLocationPermission(true);
                break;
            case RESULTS.BLOCKED:
                console.log('The permission is denied and not requestable anymore');
                store.setHasLocationPermission(false);
                break;
        }
    });
}
