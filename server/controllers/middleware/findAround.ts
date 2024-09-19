const places = require("../../models/Place");
const geolib = require('geolib');

export async function findAround(currentLat:number,currentLong:number,offset:number,limit:number,radius:number,query:object){
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