import AxiosInstance from "../../axios/AxiosInstance.tsx";
import store from "../mobx/AppDataStore.ts";
import {CitiesModel} from "../../@types/CitiesModel.ts";
import {CategoriesModel} from "../../@types/CategoriesModel.ts";
import {PlacesModel} from "../../@types/PlacesModel.ts";


export function FetchPlaces(searchString:string="",chosenCity:CitiesModel|null=null,radius:number=store.initradius,activeCategories:CategoriesModel|null=store.chosenCategories,limit:number=5,setLoading:Function,setPlaces:Function,places:Array<PlacesModel>,isReload:boolean):Promise<void>{
    isReload?setLoading(false):setLoading(true);
    AxiosInstance.post('/paginatePlaces',{offset:isReload?places.length:0,searchString:searchString,radius:radius,chosenCity:chosenCity,activeCategories:activeCategories,limit:limit})
        .then(res => {
            isReload?setPlaces([...places,...res.data]):setPlaces(res.data);
            //setPlaces([...places,...res.data]) why this is not working?
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
        });
}

