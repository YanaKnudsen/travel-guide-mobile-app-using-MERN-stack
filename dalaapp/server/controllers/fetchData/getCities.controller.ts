import {Request, Response} from "express";
const cities = require("../../models/City");


export async function getCitiesController(req:Request,res:Response):Promise<void>{
    const {offset,searchString}=req.body;
    const limit=5; //to-do:make limit a parameter
    var query:any={};
    // search parameters
    if(searchString.length>0 ) {
        query.title={ $regex : new RegExp(searchString, "i") }
    }
    try {
            const data = await cities.find(query).skip(offset).limit(limit);
            if (data) {
                res.json(data);
            } else {
                res.sendStatus(404);
            }
        }
    catch (error) {
        console.log(error);
    }
}