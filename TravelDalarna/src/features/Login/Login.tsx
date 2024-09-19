
import React, {useState} from 'react';
import {
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View,
} from 'react-native';
import store from "../../services/mobx/AppDataStore.ts";
import {obtainToken} from "../../services/api/Login/logIn.ts";

function Login({route,navigation}): React.JSX.Element {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    function login(){
        obtainToken(email,password);
    }

    return (
        <View style={styles.LoginPage}>
            <Text>Do you want to add a new place?</Text>
           <Text style={styles.title}>Log in</Text>
            <View style={styles.inputView}>
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={(val)=>setEmail(val)}
                value={email}
            />
            </View>
            <View style={styles.inputView}>
                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(val)=>setPassword(val)}
                    value={password}
                />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={login}><Text>Log in</Text></TouchableOpacity>
            <View style={styles.signUpView}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={()=>store.setIsSignUp(true)}><Text style={styles.signUp}>Sign up</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    LoginPage:{
        width:"85%",
        borderRadius:20,
        backgroundColor:"#ffffff",
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        gap:10,
        paddingVertical:25,
        paddingHorizontal:15,
    },
    title:{
        fontSize:25,
        fontWeight:"bold",
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
    signUpView:{
        display:"flex",
        flexDirection:"row",
        gap:5,
    },
    signUp:{
        textDecorationLine:"underline",
    },
    loginButton:{
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:10,
        backgroundColor:"#89CFF0",// baby blue
    }

});

export default Login;