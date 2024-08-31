import AxiosInstance from "../../../axios/AxiosInstance.tsx";
import store from "../../mobx/AppDataStore.ts";

export function obtainToken(email,password):Promise<void>{
    AxiosInstance.post('/login',{email:email,password:password})
        .then(res => {
            store.setAccessToken(res.data);
            store.setIsLogined(true);
        })
        .catch(err => {
            console.error(err);
        });
}