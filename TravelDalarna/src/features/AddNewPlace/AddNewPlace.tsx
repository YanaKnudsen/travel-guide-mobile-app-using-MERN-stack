import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Keyboard,
} from "react-native";
import React, {useCallback, useRef, useState} from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6.js";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import  {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import BottomSheet from "../../components/ui/BottomSheet.tsx";
import FilterContent from "../Filter/Filter.tsx";
import UploadPhotosBottomSheet from "../PhotosUpload/UploadPhotosBottomSheet.tsx";
import CheckboxCategory from "../../components/filter/CheckboxCategory.tsx";
import DisplayCategories from "../../components/categories/DisplayCategories.tsx";
import {uploadPhotos} from "../../services/api/PhotoUpload/uploadPhotos.ts";
import {PhotosModel} from "../../@types/PhotosModel.ts";
const { width} = Dimensions.get('window')




function AddNewPlace({navigation}) {
    const [title,setTitle]=useState("");
    const [photos, setPhotos] = useState(Array<PhotosModel>);


    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    function chooseCategories(){

    }

    function deletePhoto(photo){
        setPhotos(photos.filter(item => item !== photo));
    }

   async function sendData() {
        let chunkSize = 1 * 1024 * 1024; // 5 MB chunk size
        let totalSize = 0
        if (photos) {
            for (let i = 0; i < photos.length; i++) {
                var RNFS = require('react-native-fs');
                //check if type is a photo
                const file = await RNFS.readFile( photos[i].uri , 'base64');
                totalSize += photos[i].fileSize; //fix
                let start=0;
                let end=0;
                let chunks=[]
                for (let j = 0; j < file.length; j+=chunkSize){
                      start=j;
                      end=start+chunkSize;
                      const chunk=file.slice(start, end);
                      uploadPhotos(chunk, title);
                  }
                console.log(chunks);
            }
        }
        console.log("size",totalSize);


           // let chunks = [];
       // let step = 0;
      //  const numberOfSteps=Math.ceil(totalSize/chunkSize);
       // start 0 end chunkSize next etc
       /* if (totalSize > 0){
            const numberOfSteps=Math.ceil(totalSize/chunkSize);
            console.log("numberOfSteps",numberOfSteps); //round in the bigger direction
            for (let step = 0; step < numberOfSteps; step++) {
                uploadPhotos(photos, title);
            }
            }*/
       // }
       


       // uploadPhotos(photos, title);
    }




    return (
        <SafeAreaView>
            <BottomSheetModalProvider>
            <ScrollView style={{minHeight:"100%"}}>
            <View style={styles.main}>

                <View style={{marginBottom:20,display:"flex",justifyContent:"space-between",flexDirection:"row",alignItems:"center",width:"100%"}}>
                    <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
                        <FontAwesome5 name="arrow-left" size={15} color="#565656" />
                    </TouchableOpacity>
                <Text style={styles.titleBig}>Add a new place</Text>
                    <View style={{height:40,width:40,}}></View>

                </View>

                <View style={styles.inputView}>
                    <Text style={styles.title}>Title</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(val)=>setTitle(val)}
                        value={title}
                    />
                </View>

                <View style={styles.inputView}>
                        <Text>Description (make big and with slide bar)</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val)=>setTitle(val)}
                            value={title}
                        />
                </View>

                        <Text>Address</Text>

                    <View style={styles.inputView}>
                        <Text>Street</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val)=>setTitle(val)}
                            value={title}
                        />
                    </View>
                    <View style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",}}>
                        <View style={{width:"40%"}}>
                            <Text>Zip code</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(val)=>setTitle(val)}
                                value={title}
                            />
                        </View>
                        <View style={{width:"55%"}}>
                            <Text>City</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(val)=>setTitle(val)}
                                value={title}
                            />
                        </View>
                    </View>

                    <View style={styles.inputView}>
                        <Text>Photos</Text>
                        <TouchableOpacity style={styles.uploadButton} onPress={handlePresentModalPress}>
                            <Text>upload photos</Text>
                            <FontAwesome6 name="arrow-up-from-bracket" size={20} />
                        </TouchableOpacity>
                    </View>
                {photos.length>0 && <View style={{flexDirection: 'row', gap:10,flexWrap: 'wrap',justifyContent:"flex-start",alignItems:"center",paddingHorizontal:10,paddingVertical:10,borderRadius:10,borderWidth:1,borderColor:"#a2a2a2"}}>
                    {photos.map((photo, index) => {
                        return(
                            <View key={index} style={{position:"relative",}}>
                                <Image style={{width:width/4,height:width/6,objectFit:"cover",borderRadius:10,}}  source={{uri:photo.uri}} />
                                <TouchableOpacity style={{position:"absolute",right:"3%",top:"2%", width:20,height:20,backgroundColor:"#ffffff",borderRadius:20,display:"flex",justifyContent:"center",alignItems:"center"}} onPress={()=>deletePhoto(photo)}>
                                    <FontAwesome6 name="xmark" size={15} />
                                </TouchableOpacity>
                            </View>)
                    })}
                </View>}

                    <View style={styles.inputView}>

                        <Text>Website</Text>
                        <View style={{position:"relative",width:"100%",}}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val)=>setTitle(val)}
                            value={title}
                        />
                            <View style={{position:"absolute",width:50,height:50,right:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <FontAwesome6 name="globe" size={25} />
                            </View>
                    </View>

                    </View>

                    <View style={styles.inputView}>

                        <Text>Facebook</Text>
                        <View style={{position:"relative",width:"100%",}}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(val)=>setTitle(val)}
                                value={title}
                            />
                            <View style={{position:"absolute",width:50,height:50,right:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <FontAwesome5  name="facebook-f"  brands size={25} />
                            </View>
                        </View>

                    </View>

                    <View style={styles.inputView}>

                        <Text>Instagram</Text>
                        <View style={{position:"relative",width:"100%",}}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(val)=>setTitle(val)}
                                value={title}
                            />
                            <View style={{position:"absolute",width:50,height:50,right:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <FontAwesome5  name="instagram"  size={25} />
                            </View>
                        </View>

                    </View>

                    <Text>Categories</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap',gap:10,}}>
                    <CheckboxCategory name={"Swedish fika"} category={"fika"} onClick={()=>chooseCategories(["fika"])}/>
                    <CheckboxCategory name={"Restaurants"} category={"restaurants"} onClick={()=>chooseCategories(["restaurants"])}/>
                    <CheckboxCategory name={"Shops"} category={"shops"} onClick={()=>chooseCategories(["shops"])}/>
                    <CheckboxCategory name={"Attractions"} category={"attractions"} onClick={()=>chooseCategories(["attractions"])}/>
                    <CheckboxCategory name={"To do"} category={"toDo"} onClick={()=>chooseCategories(["toDo"])}/>
                    <CheckboxCategory name={"Accommodation"} category={"accommodation"} onClick={()=>chooseCategories(["accommodation"])}/>
                    <CheckboxCategory name={"Camping"} category={"camping"} onClick={()=>chooseCategories(["camping"])}/>
                    </View>
                    <Text>Diet</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap',gap:10,}}>
                        <CheckboxCategory name={"Vegan"} category={"vegan"} onClick={()=>chooseCategories(["fika"])}/>
                        <CheckboxCategory name={"Vegetarian"} category={"restaurants"} onClick={()=>chooseCategories(["restaurants"])}/>
                        <CheckboxCategory name={"Gluten free"} category={"shops"} onClick={()=>chooseCategories(["shops"])}/>
                        <CheckboxCategory name={"Children friendly"} category={"toDo"} onClick={()=>chooseCategories(["toDo"])}/>
                        <CheckboxCategory name={"Pets friendly"} category={"attractions"} onClick={()=>chooseCategories(["attractions"])}/>

                    </View>
                    <View style={styles.ownerView}>
                        <TouchableOpacity style={styles.checkbox}/>
                        <Text>I am a place owner</Text>
                    </View>
                    <TouchableOpacity onPress={sendData}>
                        <Text>send</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
                <BottomSheet ref={bottomSheetModalRef} firstSnapPoint={'30%'} secondSnapPoint={'30%'}>
                    <UploadPhotosBottomSheet photos={photos} setPhotos={setPhotos} />
                </BottomSheet>
                </BottomSheetModalProvider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    main:{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        height:"100%",
        width:"100%",
        paddingVertical:20,
        paddingHorizontal:20,
        flexDirection:"column",
        gap:10,
    },
    inputView:{
        width:"100%",
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"center",
        gap:5,
    },
    input:{
        width:"100%",
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderColor:"#a2a2a2",
        borderRadius:10,
    },
    titleBig:{
        fontSize:25,
        fontWeight:"bold",
    },
    title:{
        fontSize:17,
    },
    uploadButton:{
        width:"40%",
        backgroundColor:"#e3e3e3",
        marginBottom:20,
        display:"flex",
        flexDirection:"row",
        paddingVertical:7,
        paddingHorizontal:10,
        borderWidth:1,
        borderColor:"#a2a2a2",
        gap:5,
        alignItems:"center",
        justifyContent:"space-around",
        borderRadius:10,
        shadowOpacity:0.15,shadowRadius:7.5,elevation:5,

    },
    ownerView:{
       display:"flex",
       flexDirection:"row",
       alignItems:"center",
       justifyContent:"space-around",
    },
    checkbox:{
        width:25,
        height:25,
        borderColor:"#000000",
        borderRadius:5,
        borderWidth:1,
    },
    backButton:{
        marginLeft:10,
        width:40,
        height:40,
        borderRadius:20,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"     ,
        backgroundColor:"#ffffff"
    } ,
    upperNavCont:{
        position:"absolute",
        width:"100%",
        top:0,
        left:0,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    }   ,

});

export default AddNewPlace;