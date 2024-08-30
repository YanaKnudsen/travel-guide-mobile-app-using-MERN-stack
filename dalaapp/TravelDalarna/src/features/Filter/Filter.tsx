import {StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";
import ThinLine from "../../components/decorations/ThinLine.tsx";
import CheckboxCategory from "../../components/filter/CheckboxCategory.tsx";
import {chooseCategories, chooseRadius} from "../../actions/filterPlaces.ts";
import Checkbox from "../../components/filter/Checkbox.tsx";


function FilterContent() {
    return (
        <>
        <View style={{width:"100%",paddingHorizontal:15,paddingVertical:10,display:"flex",justifyContent:"center",alignItems:"center",gap:5,}}>
            <Text style={styles.title}>Filters</Text>
            <ThinLine/>
        </View>
    <View style={{display:"flex",flexDirection:"column",gap:10,}}>
        <View style={{display:"flex",flexDirection:"column",gap:10,}}>
            <Text style={styles.title}>Categories</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap',gap:10,}}>
                <CheckboxCategory name={"Swedish fika"} category={"fika"} onClick={()=>chooseCategories(["fika"])}/>
                <CheckboxCategory name={"Restaurants"} category={"restaurants"} onClick={()=>chooseCategories(["restaurants"])}/>
                <CheckboxCategory name={"Shops"} category={"shops"} onClick={()=>chooseCategories(["shops"])}/>
                <CheckboxCategory name={"Attractions"} category={"attractions"} onClick={()=>chooseCategories(["attractions"])}/>
                <CheckboxCategory name={"To do"} category={"toDo"} onClick={()=>chooseCategories(["toDo"])}/>
                <CheckboxCategory name={"Accommodation"} category={"accommodation"} onClick={()=>chooseCategories(["accommodation"])}/>
                <CheckboxCategory name={"Camping"} category={"camping"} onClick={()=>chooseCategories(["camping"])}/>
            </View>
        </View>
        <View style={{display:"flex",flexDirection:"column",gap:10,}}>
            <Text style={styles.title}>Distance</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap',gap:10,}}>
                <Checkbox name={"10 km"} onClick={()=>chooseRadius(10000)}/>
                <Checkbox name={"20 km"} onClick={()=>chooseRadius(20000)}/>
                <Checkbox name={"50 km"} onClick={()=>chooseRadius(50000)}/>
                <Checkbox name={"100 km"} onClick={()=>chooseRadius(100000)}/>
            </View>
        </View>


    </View>
        </>
    );
}

const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontWeight:"bold",
    },

});

export default FilterContent;