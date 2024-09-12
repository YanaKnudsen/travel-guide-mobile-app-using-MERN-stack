import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6.js";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uploadPhotos} from "../../services/api/PhotoUpload/uploadPhotos.ts";

const { width} = Dimensions.get('window')


function UploadPhotosBottomSheet({photos=[],setPhotos}) {

    const [photo, setPhoto] = React.useState(null);
    const [filed, setFiles] = React.useState([]);

    useEffect(() => {
        console.log("potos array",photos)
    }, [photos]);

    function choosePhoto(){
        launchImageLibrary({ noData: true }, (response) => {
            if (response) {
                setPhotos([...photos,...response.assets]);
            }
        });

/*
        console.log('files');
        console.log({files});
        const data= new FormData();
        // const data=  [];
        console.log(files.length);
        for (let i=0; i<files.length; i++){
            console.log(files[i]);
            data.append('photos',files[i]);
        }
        console.log('data');
        console.log(data);
*/
        //from example
       // launchImageLibrary(options?, callback)

// You can also use as a promise without 'callback':
       // const result = await launchImageLibrary(options?);


        /*
        AxiosInstance.post('/upload', data,{ headers: {"Authorization" : `Bearer ${store.accessToken}`,"Content-type":'multipart/form-data'}, })
            //why cant we send like {data:data}
            .then(res => {
                const {data:filenames}=res;
                console.log(data);
                onChange(prev=> {
                    return[...prev,...filenames];
                });

            })
            .catch(err => {
                // Handle errors
                console.error(err);
            });*/
    }

    function makePhoto(){

    }
    return (
        <View style={styles.photoUploader}>
            <Text style={styles.title}>Choose photos</Text>
            <View style={{width:"90%",height:"100%",display:"flex",flexDirection:"row",gap:5, justifyContent:"space-around",}}>
                <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <TouchableOpacity style={styles.uploadItem} onPress={choosePhoto}>
                    <FontAwesome6 name="photo-film" size={30} />
                </TouchableOpacity>
                <Text>Choose from gallery</Text>
                </View>
                <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <TouchableOpacity style={styles.uploadItem}>
                    <FontAwesome6 name="camera" size={30} />
                </TouchableOpacity>
                <Text>Make a photo</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    photoUploader:{
        width:"100%",
        height:"90%",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    uploadItem:{
        width:width*0.25,
        height:width*0.25,
        backgroundColor:"#e3e3e3",
        borderRadius:20,
        shadowOpacity:0.15,shadowRadius:7.5,elevation:5,
        justifyContent:"center",
        alignItems:"center",
        borderColor:"#d0d0d0",
        borderWidth:1,
        marginBottom:10
    },
    title:{
        fontSize:20,
        marginBottom:20,
    },



});

export default UploadPhotosBottomSheet;