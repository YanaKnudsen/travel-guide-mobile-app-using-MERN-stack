import AxiosInstance from "../../../axios/AxiosInstance.tsx";
import store from "../../mobx/AppDataStore.ts";
import {fetchUserData} from "./fetchUserData.ts";

export function obtainToken(email,password):Promise<void>{
    AxiosInstance.post('/login',{email:email,password:password})
        .then(res => {
            store.setAccessToken(res.data.accessToken);
            store.setIsLogined(true);
            fetchUserData();
        })
        .catch(err => {
            console.error(err);
        });
}