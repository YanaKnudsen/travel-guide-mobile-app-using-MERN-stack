import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import Login from "../features/Login/Login.tsx";
import store from "../services/mobx/AppDataStore.ts";
import SignUp from "../features/Login/SignUp.tsx";
import { observer } from "mobx-react";
import ProfileContent from "../features/Profile/ProfileContent.tsx";

//to-do: forgot password feature
//t-do add on both login and signup so you can not see password when typing like eye
//to-do:add islogdein to persistent values
function Profile({route,navigation}): React.JSX.Element {
    useEffect(() => {
        store.setIsLogined(true);
    }, []);
    return (
        <ImageBackground source={store.isLogined?(require("../../assets/backgrounds/dalaWallPaper.png")):(require("../../assets/backgrounds/forest.png"))} resizeMode="cover">
        <SafeAreaView style={[styles.profilePage,{backgroundColor:store.isLogined?"#ffffff97":"transparent"}]}>
            {store.isLogined?
                (<ProfileContent/>)
                :
                (store.isSignUp?(<SignUp/>):(<Login/>))
            }
        </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
profilePage:{
    height:height,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
}
});

export default observer(Profile);