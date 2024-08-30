import {Request, Response} from "express";
const cities = require("../../models/City");


export async function getCitiesController(req:Request,res:Response):Promise<void>{
    const {offset,searchString,limit}=req.body;
    var query:any={};
    // search parameters
    if(searchString.length>0 ) {
        query.name={ $regex : new RegExp(searchString, "i") }
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