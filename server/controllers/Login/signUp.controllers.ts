import { Request, Response } from "express";
const users=require("../../models/Login/Signup");
const bcrypt=require("bcryptjs");
const bcryptSalt=bcrypt.genSaltSync(8);





export async function signupController(req:Request,res:Response):Promise<void>{
    const {fullName,email,password}=req.body;
    try{
        console.log("here");
        //create user in the database
        const userInfo = await users.create({
            fullName,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        });
        console.log(userInfo);
        res.json(userInfo);
    }
    catch(e){
        res.status(422).json(e);
    }
    //response


}

