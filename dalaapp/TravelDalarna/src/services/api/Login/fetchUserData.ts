import AxiosInstance from "../../../axios/AxiosInstance.tsx";
import store from "../../mobx/AppDataStore.ts";

export function fetchUserData(email,password):Promise<void>{
    AxiosInstance.get('/profile',)
        .then(res => {

        })
        .catch(err => {
            console.error(err);
        });
}
