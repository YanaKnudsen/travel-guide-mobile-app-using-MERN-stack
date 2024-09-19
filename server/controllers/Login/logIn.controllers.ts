import { Request, Response } from "express";
const users=require("../../models/Login/Signup");
import {generateAccessToken} from "../middleware/generateAccessToken";
const bcrypt=require("bcryptjs");



export async function loginController(req:Request,res:Response):Promise<void>{
    console.log("inside login controller");
        const {email,password}=req.body;
        //find user with this email in the databse
        const userInfo = await users.findOne({email});
        if(userInfo)    {
            //jwt compare
            const passOk=bcrypt.compareSync(password,userInfo.password)
            if(passOk){
                const accessToken = generateAccessToken(userInfo);
                console.log('accessToken',accessToken);
                res.json({accessToken});
            }
            else{
                res.status(422).json('password is incorrect');
            }
        }
        else{
            res.status(404).json('user not found');
        }

}


