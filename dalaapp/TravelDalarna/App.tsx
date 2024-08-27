import 'react-native-gesture-handler';
import * as React from 'react';
import type {PropsWithChildren} from 'react';
import Home from "./src/screens/Home.tsx";
import Map from "./src/screens/Map.tsx";
import {
    Image,
    StyleSheet,
} from 'react-native';
import { Text, View,TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import PlacesList from "./src/screens/PlacesList.tsx";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import PlacePage from "./src/screens/PlacePage.tsx";
import store from "./src/services/mobx/AppDataStore.ts";
import { observer } from "mobx-react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6.js";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function HomeNav({route,navigation}) {
    function goToMap(){
        Object.keys(store.chosenCategories).forEach(function(key, value) {
            return store.chosenCategories[key] = false;
        })
        if (store.mapFlag){

        }
        else{
            navigation.navigate('Map');
        }
        store.setPlacesFlag(false);
        store.setHomeFlag(false);
        store.setMapFlag(true);
    }
    function goToHome(){
        if (store.homeFlag){

        }
        else{
            navigation.navigate('HomeScreen');
        }
        store.setPlacesFlag(false);
        store.setHomeFlag(true);
        store.setMapFlag(false);
    }
    function goToPlaces(){
        if (store.placesFlag){

        }
        else{
            navigation.navigate('Places',{categoryList:[]});
        }
        store.setPlacesFlag(true);
        store.setHomeFlag(false);
        store.setMapFlag(false);
        store.setChosenCity(null);
        store.setRadius(store.initradius);
    }
    return (
        <Tab.Navigator  initialRouteName="HomeScreen" screenOptions={{headerShown: false ,tabBarShowLabel: false,
            tabBarStyle: [{ backgroundColor: '#ffffff',borderTopRightRadius:20,borderTopLeftRadius:20,shadowOpacity:0.15,shadowRadius:30.5,elevation:5, }],
        }}  >
            <Tab.Screen name="Map" component={Map} options={{
                tabBarIcon:({focused})=>(
                    <View style={{ display:'flex',justifyContent:'center',alignItems:'center',marginTop:10,}}>
                        <Image style={{width:40,height:40,}}  source={require('./assets/icons/flag.png')} />
                        <Text>map</Text>
                    </View>
                ),
                tabBarButton: (props) => (<TouchableOpacity style={{width: "40%", height: 50,display:"flex",justifyContent:"center",alignItems:"center",paddingTop:10}} onPress={goToMap} >
                    <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <FontAwesome5 name="map" solid size={20} color={store.mapFlag?"#000000":"#a2a2a2"}/>
                    <Text style={{color:store.mapFlag?"#000000":"#a2a2a2"}}>map</Text>
                    </View>
                </TouchableOpacity>),
            }}/>
            <Tab.Screen name="HomeScreen" component={Home} options={{
                tabBarIcon:({focused})=>(
                    <View style={{ display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>
                        <View style={{position:'absolute',backgroundColor:'#ffffff',top:-50,display:'flex',justifyContent:'center',alignItems:'center', borderRadius:70,width:80, height:80,borderColor:'#ea5d5c',borderWidth:2,padding:5,}}>
                            <Image style={{width:'100%',height:'100%',borderTopLeftRadius:10,borderTopRightRadius:10,objectFit:"contain"}}  source={require('./assets/icons/dalaIcon.png')} />
                        </View>
                    </View>
                ),
                tabBarButton: (props) => (<TouchableOpacity style={{width: "20%", height: 50,display:"flex",justifyContent:"center",alignItems:"center",position:"relative"}} onPress={goToHome} >
                    <View style={{position:'absolute',backgroundColor:'#ffffff',top:-40,display:'flex',justifyContent:'center',alignItems:'center', borderRadius:70,width:80, height:80,borderColor:'#ea5d5c',borderWidth:2,padding:5,}}>
                        <Image style={{width:'100%',height:'100%',borderTopLeftRadius:10,borderTopRightRadius:10,objectFit:"contain"}}  source={require('./assets/icons/dalaIcon.png')} />
                    </View>
                    <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <View style={{width:20,height:20}}></View>
                    <Text></Text>
                    </View>
                </TouchableOpacity>),
            }}/>
            <Tab.Screen name="Places" component={PlacesList} options={{
                tabBarIcon:({focused})=>(
                    <View style={{ display:'flex',justifyContent:'center',alignItems:'center',marginTop:10,}}>
                        <Image style={{width:40,height:40,}}  source={require('./assets/icons/house.png')} />
                        <Text>places</Text>
                    </View>
                ),
                tabBarButton: (props) => (<TouchableOpacity style={{width: "40%",height: 50,display:"flex",justifyContent:"center",alignItems:"center",paddingTop:10}} onPress={goToPlaces} >
                    <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <FontAwesome5 name="list" size={20} color={store.placesFlag?"#000000":"#a2a2a2"}/>
                    <Text style={{color:store.placesFlag?"#000000":"#a2a2a2"}}>places</Text>
                    </View>
                </TouchableOpacity>),
            }}/>
        </Tab.Navigator>
    );
}

function App(): React.JSX.Element {

  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                  name="Home"
                  component={HomeNav}
                  options={{ headerShown: false }}
              />
              <Stack.Screen name="PlacePage" component={PlacePage} options={{ headerShown: false }}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default observer(App);
