import fs from "fs";
import { Request, Response,NextFunction } from "express";
import {UserType} from "../../types/users.type";
interface IGetUserAuthInfoRequest extends Request {
    user?: UserType, // or any other type
    data?:any,
}




export async function uploadFromGalleryController(req:IGetUserAuthInfoRequest,res:Response,next:NextFunction):Promise<void>{
    const uploadedFiles:any=[];
    /*for(let i=0;i<req.files.length;i++) {
        const {uri,fileName}=req.data.photos[i];
        const ext=fileName.split('.')[1];
        const newPath=uri+'.'+ext;
        console.log("newPath",newPath)
       // fs.renameSync(uri,newPath);
     //   console.log(newPath)*/
      //  uploadedFiles.push(newPath.replace(`assets/uploads/${req.data?.title}`,''));
   // }
    res.sendStatus(200)
}






