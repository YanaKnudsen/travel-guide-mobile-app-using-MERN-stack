import AxiosInstance from "../../../axios/AxiosInstance.tsx";
import store from "../../mobx/AppDataStore.ts";

export function fetchUserData():Promise<void>{
    AxiosInstance.get('/profile',{ headers: {"Authorization" : `Bearer ${store.accessToken}`} })
        .then(res => {
            store.setUser(res.data);

        })
        .catch(err => {
            console.error(err);
        });
}
