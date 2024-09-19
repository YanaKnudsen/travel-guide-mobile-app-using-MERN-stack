import AxiosInstance from "../../axios/AxiosInstance.tsx";
import store from "../mobx/AppDataStore.ts";
import {CategoriesModel} from "../../@types/CategoriesModel.ts";

export function FetchMarkers(searchString:string,activeCategories:CategoriesModel|null,setLoading:Function,isReload:boolean):Promise<void>{
    isReload?setLoading(false):setLoading(true);
    AxiosInstance.post('/loadMarkers',{searchString:searchString,activeCategories:activeCategories})
        .then(res => {
            store.setMarkers(res.data);
            //add my loc marker?
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
        });
}


