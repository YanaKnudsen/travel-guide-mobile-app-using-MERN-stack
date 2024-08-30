import {CitiesModel} from "../@types/CitiesModel.ts";
import store from "../services/mobx/AppDataStore.ts";
import {animateToRegion} from "./mapAnimations.ts";


export function chooseCity(city:CitiesModel,mapRef=null,setSearchString:Function){
        setSearchString("");
        if (city._id=="mylocation"){
            if (store.hasLocationPermission){
                store.setChosenCity(city);
                store.setRadius(10000);
                if(mapRef!=null){
                    animateToRegion(city.location[0], city.location[1],0.0922,0.0421,mapRef);
                }
                return;
            }
            else{
                //requestPermission();
                return;
            }
        }
        store.setChosenCity(city);
        store.setRadius(10000);
    if(mapRef!=null){
        animateToRegion(city.location[0], city.location[1],0.0922,0.0421,mapRef);
    }

}

type BottomSheetProps={
    city:CitiesModel
};
export type BottomSheetRefProps={

};



export function unChooseCity(setSearchString:Function){
        store.setChosenCity(null);
        store.setRadius(store.initradius);
        setSearchString("");
}

export function chooseCategories(categoryList:Array<string>){
    for (let category of categoryList) {
        if (store.chosenCategories[category]) {
            store.setChosenCategories({...store.chosenCategories, [category]: false})
        } else {
            store.setChosenCategories({...store.chosenCategories, [category]: true})
        }
    }
}

//to-do: show filtering according to the radius only if city is chosen
export function chooseRadius(radius:number){
    store.radius==radius?store.setRadius(store.initradius):store.setRadius(radius);
}

