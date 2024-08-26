const express = require('express');
import {Router, Request, Response, NextFunction} from 'express';
const cors=require('cors');
const mongoose = require("mongoose");
const geolib = require('geolib');
const places = require("./models/Place");
const cities = require("./models/City");
const app=express();
app.use(express.static('uploads'));
require('dotenv').config();

app.use(express.json());


console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);



//get list of all places
app.get('/places', async (req:Request,res:Response)=>{
    const placesList = await places.find();
    console.log(placesList);
    res.json(placesList);
});





app.post('/paginatePlaces', async (req:Request,res:Response)=>{
    const {offset,searchString,chosenCity,radius,activeCategories,limit}=req.body;
    console.log("loading places");
    console.log(offset,searchString,chosenCity,radius,activeCategories,limit);
    //make radius a var
    var query:any={};   //change any crate new type
    if(searchString.length>0 ) {
        query.title={ $regex : new RegExp(searchString, "i") }
    }
    if(chosenCity!=null){
             findAround(chosenCity.location[0],chosenCity.location[1],offset,limit,radius,query).then(filteredAccToCity =>
             {
                 res.json(filteredAccToCity);
             }
             );
            return;  
         }
 
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

    const data = await places.find(query).skip(offset).limit(limit);
    res.json(data);

});

app.post('/searchCity', async (req:Request,res:Response)=>{
       //same approach as in paginatePlaces
       const limit1=5;
       const {offset,searchString}=req.body;
       var query:any={};   //change any crate new type
       if(searchString.length>0) {
           query.name={ $regex : new RegExp(searchString, "i") }
       }

       const data =  await cities.find(query).skip(offset).limit(limit1);
       res.json(data);


    });

app.post('/loadMarkers', async (req:Request,res:Response)=>{
    console.log("loading initial markers");
    const {searchString,activeCategories}=req.body;
    console.log(searchString);
    console.log(activeCategories);
    //make radius a var
    var query:any={};   //change any crate new type
    if(searchString.length>0 ) {
        query.title={ $regex : new RegExp(searchString, "i") }
    }
    if(activeCategories)
    {

        const filteredPlaces=[];
        const relevantCategories=Object.keys(activeCategories)
            .filter(function(k){return activeCategories[k]})
            .map(String);
        const relevantCategoriesWONearest = relevantCategories.filter(category => category !== "nearest");
        console.log(relevantCategoriesWONearest.length);
        if(relevantCategoriesWONearest.length>0){
            query.categories=  { $in : relevantCategoriesWONearest } ;
        }else{

        }
    }
    else{

    }
       const data =  await places.find(query,'title location');//only load title and location
    console.log(data);
       res.json(data);


    });


   async function findAround(currentLat:number,currentLong:number,offset:number,limit:number,radius:number,query:object){
        // step1: upload all places
       console.log("offset radius")
       console.log(offset);
       console.log(radius);
        const placesList = await places.find(query);
        const filteredPlaces=[];
        // step 2: sort according to distance from city loc
        const allLocations=[];
        for (let i = 0; i < placesList.length; i++) {
            allLocations.push({latitude: placesList[i].location[0],longitude: placesList[i].location[1]});
        }
        const orderedByDistancePlaces= geolib.orderByDistance({ latitude:currentLat, longitude: currentLong }, allLocations);
        console.log("limoff",limit+offset)
        for (let i = offset; i < (limit+offset); i++) {
            // do it only if inside radius:
            console.log("i",i);
            if(orderedByDistancePlaces[i]){
                const dist=geolib.getPreciseDistance(
                    { latitude:orderedByDistancePlaces[i].latitude, longitude: orderedByDistancePlaces[i].longitude },
                    { latitude:currentLat, longitude: currentLong }
                );
                if (dist<=radius){
                    const nearestPlace = await places.findOne({location:[orderedByDistancePlaces[i].latitude,orderedByDistancePlaces[i].longitude]});
                    nearestPlace.dist=dist;
                    console.log("place",nearestPlace.title);
                    console.log("dist",dist);
                    console.log("current",currentLat);
                    filteredPlaces.push(nearestPlace);
                }
                else {

                }
            }

                }


                return filteredPlaces;

   }

type PlacesType = {
    _id:string,
    title:string,
    description:string,
    location:Array<number>,
    address:string,
    photos:Array<string>,
    diet:Array<string>,
    website:string,
    facebook:string,
    instagram:string,
    categories:Array<string>,
    id:string,
    distance:number,
    __v:number,
}

 type CityType = {
     _id:string,
     name:string,
     chosen:boolean,
     location:Array<number>,
 }






app.listen(4000);