import {CitiesModel} from "../@types/CitiesModel.ts";
import store from "../services/mobx/AppDataStore.ts";

export function chooseCity(city:CitiesModel){
        if (city._id=="mylocation"){
            console.log("here")
            console.log(store.hasLocationPermission);
            if (store.hasLocationPermission){
                store.setChosenCity(city);
                store.setRadius(10000);
                return;
            }
            else{
                //requestPermission();
                return;
            }
        }
        store.setChosenCity(city);
        store.setRadius(10000);

}

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

