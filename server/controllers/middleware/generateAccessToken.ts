const jwt=require("jsonwebtoken");
import {UserType} from "../../types/users.type";

export function generateAccessToken(userInfo:UserType){
    return jwt.sign({email:userInfo.email, id:userInfo._id,},process.env.ACCESS_TOKEN_SECRET,{});//15m
}