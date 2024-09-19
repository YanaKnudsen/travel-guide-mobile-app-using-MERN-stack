// Middleware to manually parse form data before Multer
import {NextFunction, Request, Response} from "express";
const busboy = require('busboy');
import {UserType} from "../../types/users.type";
interface IGetUserAuthInfoRequest extends Request {
    user?: UserType, // or any other type
    data?:any,
}
const os = require('os');
const fs = require('fs');
//const fs = require('fs/promises');
const {createWriteStream} = require('fs');
const {v4: uuidv4} = require('uuid');
const path = require('path');


export async function busboyMiddleware(req:IGetUserAuthInfoRequest,res:Response,next:NextFunction){
    console.log('here');
    const bb = busboy({ headers: req.headers });
    const formData: any = {};
    let uploadDir="";
    let id: string | null = null;
    const uploadedFiles: string[] = [];

    bb.on('field', (fieldname:string, value:any) => {
        // Capture form fields here
        id=value;
        if (fieldname === 'id') {
            id = value;  // Capture the id
            console.log(`Received id: ${id}`);
        }
    });

    bb.on('file', (name:string, file:any, info:any) => {
        const { filename, mimeType } = info;
        console.log(`Uploading file: ${filename} (${mimeType})`);
        console.log(id);

        // Ensure the ID was received
        if (!id) {
            console.error('No ID found in the form data.');
            file.resume(); // Discard the file stream
            return;
        }

        // Create a directory named after the ID if it doesn't exist
        const uploadDir = path.join('uploads', id);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
    }
        console.log("file",filename);
        const saveTo = path.join(uploadDir, filename);
        file.pipe(fs.createWriteStream(saveTo));
    });

    bb.on('finish', () => {
        fs.readdir(uploadDir, function(err:any, files:any) {
            if (err) {
                //res.status(400).send({ error: 'Something went wrong' });
            } else {
                /*if (!files.length) {
                    res.status(200).send({
                        message: `Files uploaded successfully to uploads/${id}`,
                        files: uploadedFiles,
                    });
                }*/
            }
        })
    });

    req.pipe(bb);

    next();
}
