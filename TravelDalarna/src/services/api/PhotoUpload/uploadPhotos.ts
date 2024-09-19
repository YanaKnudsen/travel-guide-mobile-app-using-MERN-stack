import AxiosInstance from "../../../axios/AxiosInstance.tsx";
import store from "../../mobx/AppDataStore.ts";
import {Platform, StyleSheet, Text, ScrollView} from 'react-native';





export function uploadPhotos(photos:Array<any>,title:string):Promise<void>{
    const id=title.replace(/\s/g,'');// tite without white spaces,basically id
    /*const data= new FormData();
    for (let i=0; i<photos.length; i++){
        data.append('photos',photos[i]);
    }
    data.append('title',id);
    console.log(data);*/
    const data = new FormData();
    data.append('id',id);
    photos.forEach((photo, index) => {
        console.log(photo);
        data.append('photos', {
            uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
            type: photo.type,
            name: photo.fileName,
        });
    });


    AxiosInstance.post('/uploadPhotos', data,{ headers: {"Authorization" : `Bearer ${store.accessToken}`, 'Content-Type': 'multipart/form-data',} })
        .then(res => {

        })
        .catch(err => {
            console.error(err);
        });
}
