import App from "./App"
// import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import {config as dontenvConfig} from "dotenv";
import config from "./config/config";


// config 
import "./config/db.connection";
dontenvConfig();

//Middlewares
App.use(cookieParser(config.SECRET));
App.use(logger('dev'));
App.set('PORT',config.PORT);

App.listen(App.get('PORT'),()=>{
    console.log('Server on port ',App.get('PORT'));
});