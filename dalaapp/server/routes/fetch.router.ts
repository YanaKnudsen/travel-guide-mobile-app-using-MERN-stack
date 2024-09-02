import express from "express";
import { getPlacesController } from "../controllers/fetchData/getPlaces.controller";
import { getCitiesController } from "../controllers/fetchData/getCities.controller";
import { getMarkersController  } from "../controllers/fetchData/getMarkers.controller";
import {loginController} from "../controllers/Login/logIn.controllers";
import {signupController} from "../controllers/Login/signUp.controllers";
import {profileController} from "../controllers/Login/profile.controllers";
import {authenticateToken} from "../controllers/middleware/authenticateToken";

export const fetchDataRoute = express.Router();

fetchDataRoute.post("/paginatePlaces", getPlacesController);
fetchDataRoute.post("/searchCity", getCitiesController);
fetchDataRoute.post("/loadMarkers", getMarkersController);
fetchDataRoute.post("/login", loginController);
fetchDataRoute.post("/signup", signupController);
fetchDataRoute.get("/profile", authenticateToken,profileController);
