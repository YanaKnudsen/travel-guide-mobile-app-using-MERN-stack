import { makeAutoObservable } from "mobx";
import {PlacesModel} from "../@types/PlacesModel.ts";
import {CategoriesModel} from "../@types/CategoriesModel.ts";
import { makePersistable,hydrateStore  } from 'mobx-persist-store';
import {CitiesModel} from "../@types/CitiesModel.ts";
import {LocationType} from "../@types/Locationtype.ts";
import {MarkersModel} from "../@types/MarkersModel.ts";

class AppDataStore{
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'SampleStore',
            properties: ["hasLocationPermission","currentLocation"],
            storage: window.localStorage
        }).then(r => {});
    }


    places = new Array<PlacesModel>;
    markers = new Array<MarkersModel>;
    nearestPlaces = new Array<PlacesModel>;
    chosenCity : CitiesModel| null=null ;
    myLocation: CitiesModel| null  = [{
        _id:"mylocation",
        name:"My location",
        location:[0,0]
    }];
    currentPosition : LocationType| null=null ;

    chosenCategories: CategoriesModel | null = {
            nearest:false,
            fika: false,
            restaurants: false,
            shops: false,
            attractions: false,
            toDo: false,
            accomodation: false,
            camping: false,
        };

    currentLat:number=0;
    currentLong:number=0;
    radius:number=25000000;
    initradius:number=25000000;

    permissionGranted:boolean=false;
    hasLocationPermission:boolean=false;

    placesFlag:boolean=false;
    homeFlag:boolean=false;
    mapFlag:boolean=false;


    setPlaces(items: Array<PlacesModel> ) {
        this.places = items;
    }
    setMarkers(items: Array<MarkersModel> ) {
        this.markers = items;
    }
    setNearestPlaces(items: Array<PlacesModel> ) {
        this.nearestPlaces = items;
    }
    setChosenCity(items: Array<CitiesModel> ) {
        this.chosenCity = items;
    }
    setMyLocation(items: Array<CitiesModel> ) {
        this.myLocation = items;
    }
    setCurrentPosition(item: LocationType ) {
        this.currentLocation = item;
    }
    setChosenCategories(item: CategoriesModel | null ) {
        this.chosenCategories = item;
    }
    setCurrentLat(val:number) {
        this.currentLat = val;
    }
    setCurrentLong(val:number) {
        this.currentLong = val;
    }
    setRadius(val:number) {
        this.radius = val;
    }

    setHasLocationPermission(val:boolean) {
        this.hasLocationPermission = val;
    }

    setPlacesFlag(val:boolean) {
        this.placesFlag = val;
    }
    setHomeFlag(val:boolean) {
        this.homeFlag = val;
    }
    setMapFlag(val:boolean) {
        this.mapFlag = val;
    }

    async hydrateStore() {
        await hydrateStore(this);
    }
}

const store = new AppDataStore();
export default store;