import { Request, Response,NextFunction } from "express";
import {UserType} from "../../types/users.type";
const users=require("../../models/Login/Signup");
interface IGetUserAuthInfoRequest extends Request {
    user?: UserType // or any other type
}






export async function profileController(req:IGetUserAuthInfoRequest,res:Response,next:NextFunction):Promise<void>{
    console.log("in prof controller",req.user);
    const email=req.user?.email;
    console.log("obtained email",email);
    const userInfo = await users.findOne({email: email}, 'email fullName');
    res.json(userInfo);
}

