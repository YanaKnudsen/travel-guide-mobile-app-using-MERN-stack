import express, {NextFunction, Request, Response} from "express";
import {UserType} from "../../types/users.type";
interface IGetUserAuthInfoRequest extends Request {
   user?: UserType, // or any other type
   data?:any,
}


import multer, { FileFilterCallback } from 'multer';
import path from 'path';

//export const upload=multer({dest:'uploads/'});

// Set storage engine
const storage = multer.diskStorage({
   destination: (req:Request, file, cb) => {
      console.log("body",req.query);
    //  cb(null, `assets/uploads/${req.data?.title}`);
      //const id = req.body.data.id;
      //cb(null, `assets/uploads/${id}`);
      cb(null, `uploads/`);
   },
   filename: (req:IGetUserAuthInfoRequest, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
   },
});


export const upload = multer({
   storage, //Where to store the files
   //limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  // fileFilter,
});
