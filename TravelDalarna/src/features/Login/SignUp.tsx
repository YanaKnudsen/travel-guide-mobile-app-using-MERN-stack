
import React, {useState} from 'react';
import {
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View,
} from 'react-native';
import store from "../../services/mobx/AppDataStore.ts";
import {signUp} from "../../services/api/Login/signUp.ts";


function SignUp(): React.JSX.Element {

    const [fullName,setFullName]=useState("");
    const [email,setemail]=useState("");
    const [password,setPassword]=useState("");
    function signup(){
        signUp(fullName,email,password);
    }
    return (
        <View style={styles.LoginPage}>
            <Text style={styles.title}>Sign up</Text>
            <View style={styles.inputView}>
                <Text>Full name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(val)=>setFullName(val)}
                    value={fullName}
                />
            </View>
            <View style={styles.inputView}>
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(val)=>setemail(val)}
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
            <TouchableOpacity style={styles.loginButton} onPress={signup}><Text>Sign up</Text></TouchableOpacity>
            <View style={styles.signUpView}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={()=>store.setIsSignUp(false)}><Text style={styles.signUp}>Log in</Text></TouchableOpacity>
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
        backgroundColor:"#ACE1AF",// celadon
    }

});

export default SignUp;