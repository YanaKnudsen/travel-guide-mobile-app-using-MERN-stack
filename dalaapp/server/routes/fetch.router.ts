import express from "express";
import { getPlacesController } from "../controllers/fetchData/getPlaces.controller";
import { getCitiesController } from "../controllers/fetchData/getCities.controller";
import { getMarkersController  } from "../controllers/fetchData/getMarkers.controller";

export const fetchDataRoute = express.Router();

fetchDataRoute.post("/paginatePlaces", getPlacesController);
fetchDataRoute.post("/searchCity", getCitiesController);
fetchDataRoute.post("/loadMarkers", getMarkersController);
