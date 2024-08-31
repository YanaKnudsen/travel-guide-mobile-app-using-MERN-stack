import express from "express";
import {loginController} from "../controllers/Login/logIn.controllers";


export const loginRoute = express.Router();

loginRoute.get("/login", loginController);
//loginRoute.post("/signup", getCitiesController);
