import {UserType} from "../../types/users.type";
import { Request, Response,NextFunction } from "express";
interface IGetUserAuthInfoRequest extends Request {
    user?: UserType // or any other type
}

const jwt=require("jsonwebtoken");

export async function authenticateToken(req:IGetUserAuthInfoRequest,res:Response,next:NextFunction){
    //token is coming from the http header
    //check if bearer, in the beginning smt like this: if (req.headers.authorization?.split(" ")[0] === "Bearer") {} why?
    const authHeader=req.headers.authorization;
    const accessToken = authHeader?.split(" ")[1]
    console.log("accessToken auth",accessToken);
    if (accessToken==null){
        return res.sendStatus(401);
    }
    else{
        jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET,async (err:Error,user:UserType)=>{
            //can I give next only info from token or is it okay to extract like this?
            if (err) res.sendStatus(403);
            req.user=user;
            console.log("user",user);
            next();
        });
    }

}