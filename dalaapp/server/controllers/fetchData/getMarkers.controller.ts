import { Request, Response } from "express";
const places = require("../../models/Place");



export async function getMarkersController(req:Request,res:Response):Promise<void>{
    const {searchString,activeCategories}=req.body;
    var query:any={};
    // search parameters
    if(searchString.length>0 ) {
        query.title={ $regex : new RegExp(searchString, "i") }
    }
    // if filtered according to categories
    if(activeCategories)
    {

        const filteredPlaces=[];
        const relevantCategories=Object.keys(activeCategories)
            .filter(function(k){return activeCategories[k]})
            .map(String);
        const relevantCategoriesWONearest = relevantCategories.filter(category => category !== "nearest");
        console.log(relevantCategoriesWONearest) ;
        if(relevantCategoriesWONearest.length>0){
            query.categories=  { $in : relevantCategoriesWONearest } ;
        }else{

        }
    }
    else{

    }

    try {
        const data =  await places.find(query,'title location');//only load title and location
        if (data) {
            res.json(data);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
    }
}

