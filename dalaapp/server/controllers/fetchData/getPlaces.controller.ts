import { Request, Response } from "express";
const places = require("../../models/Place");
import {findAround} from "../middleware/findAround";


export async function getPlacesController(req:Request,res:Response):Promise<void>{
    const {offset,searchString,chosenCity,radius,activeCategories,limit}=req.body;
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
        if(chosenCity!=null){
            findAround(chosenCity.location[0],chosenCity.location[1],offset,limit,radius,query).then(filteredAccToCity =>
                {
                    if (filteredAccToCity) {
                        res.json(filteredAccToCity);
                    } else {
                        res.sendStatus(404);
                    }
                }
            );
            return;
        }else{
            const data = await places.find(query).skip(offset).limit(limit);
            if (data) {
                res.json(data);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (error) {
        console.log(error);
    }
}
