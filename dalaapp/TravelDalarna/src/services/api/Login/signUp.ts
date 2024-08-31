import AxiosInstance from "../../../axios/AxiosInstance.tsx";
import store from "../../mobx/AppDataStore.ts";

export function signUp(fullName:string,email:string,password:string):Promise<void>{
    AxiosInstance.post('/signup',{fullName:fullName,email:email,password:password})
        .then(res => {
            store.setIsSignUp(false);
            //to-do:add sccesssfully log ined please sign up
        })
        .catch(err => {
            console.error(err);
        });
}
