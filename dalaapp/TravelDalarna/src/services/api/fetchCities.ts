import AxiosInstance from "../../axios/AxiosInstance.tsx";
import store from "../mobx/AppDataStore.ts";
import {CitiesModel} from "../../@types/CitiesModel.ts";

export function FetchCities(searchString:string,limit:number=5,setLoading:Function,setCities:Function,cities:Array<CitiesModel>,isReload:boolean):Promise<void>{
    isReload?setLoading(false):setLoading(true);
    AxiosInstance.post('/searchCity',{offset:isReload?cities.length:0,searchString:searchString,limit:limit})
        .then(res => {
            isReload?setCities([...cities,...res.data]):setCities([...store.myLocation,...res.data]);
            //setCities([...store.myLocation,...res.data]);
            console.log("cities data",res.data)
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
        });
}

