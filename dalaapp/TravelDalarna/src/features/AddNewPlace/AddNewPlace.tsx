import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
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




function AddNewPlace({navigation}) {
    const [title,setTitle]=useState("");
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    function chooseCategories(){

    }

    return (
        <SafeAreaView>
            <BottomSheetModalProvider>
            <ScrollView style={{minHeight:"100%"}}>
            <View style={styles.main}>
                <View style={{marginBottom:20,}}>
                <Text style={styles.titleBig}>Add a new place</Text>
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
                    <TouchableOpacity>
                        <Text>send</Text></TouchableOpacity>

                </View>
            </ScrollView>
                <BottomSheet ref={bottomSheetModalRef} firstSnapPoint={'30%'} secondSnapPoint={'30%'}>
                    <UploadPhotosBottomSheet/>
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
    }

});

export default AddNewPlace;