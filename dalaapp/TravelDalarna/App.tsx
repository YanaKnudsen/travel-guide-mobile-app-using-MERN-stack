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
import Profile from "./src/screens/Profile.tsx";
import AddNewPlace from "./src/features/AddNewPlace/AddNewPlace.tsx";
import Hiking from "./src/screens/Hiking.tsx";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function HomeNav({route,navigation}) {


    return (
        <Tab.Navigator  initialRouteName="HomeScreen" screenOptions={{headerShown: false ,tabBarShowLabel: false,
            tabBarStyle: [{ backgroundColor: '#ffffff',shadowOpacity:0.15,shadowRadius:30.5,elevation:5, }],
        }}  >
            <Tab.Screen name="Map" component={Map} options={{
                tabBarIcon:({focused})=>(
                    <View style={{ display:'flex',justifyContent:'center',alignItems:'center',}}>
                        <FontAwesome5 name="map" solid size={20} color={focused?"#000000":"#a2a2a2"}/>
                        <Text>map</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name="HomeScreen" component={Home} options={{
                tabBarIcon:({focused})=>(
                    <View style={{ display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <FontAwesome6 name="house" size={20} color={focused?"#000000":"#a2a2a2"}/>
                        <Text>Home</Text>
                    </View>
                ),

            }}/>
            <Tab.Screen name="Places" component={PlacesList} options={{
                tabBarIcon:({focused})=>(
                    <View style={{ display:'flex',justifyContent:'center',alignItems:'center',}}>
                        <FontAwesome5 name="list" size={20} color={focused?"#000000":"#a2a2a2"}/>
                        <Text>places</Text>
                    </View>
                ),
            }}/>
            {/* <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon:({focused})=>(
                    <View style={{ display:'flex',justifyContent:'center',alignItems:'center',}}>
                        <FontAwesome5 name="user" solid size={20} color={focused?"#000000":"#a2a2a2"}/>
                        <Text>profile</Text>
                    </View>
                ),

            }}/>*/}
             <Tab.Screen name="Nature" component={Hiking} options={{
                tabBarIcon:({focused})=>(
                    <View style={{ display:'flex',justifyContent:'center',alignItems:'center',}}>
                        <FontAwesome6 name="person-hiking" solid size={20} color={focused?"#000000":"#a2a2a2"}/>
                        <Text>outdoor</Text>
                    </View>
                ),

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
              <Stack.Screen name="AddNewPlace" component={AddNewPlace} options={{ headerShown: false }}/>
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
