import App from "./App"
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import {config as dontenvConfig} from "dotenv";
import config from "./config/config";
import multer from "multer"
import {v4 as uuid} from 'uuid'
import path from "path"

// config 
import "./config/db.connection";
let staticFiles = '../public/'
dontenvConfig();
App.use(`${config.API_VERSION}/public`,express.static(path.resolve(__dirname,staticFiles)));

// uploader and storage configuration
const storage = multer.diskStorage({
    destination :(req,file,callback)=>{
        let staticFiles = '../public/'
        callback(null,path.resolve(__dirname,staticFiles,'uploads'));
        App.use('/public',express.static(path.resolve(__dirname,staticFiles)));
    },
    filename:(req,file,callback)=>{
        callback(null, uuid()+path.extname(file.originalname));
    },
}); 
export const uploader = multer({
    storage,
    limits:{
         fileSize:1024 * 1024 * 2,
         files:1,
         fieldSize:100,
    },
    fileFilter(req,file,callback){
        let regexp = new RegExp('(image/jpeg|image/jpg|image/png)');
        let isValid = regexp.test(file.mimetype); 
        if(isValid) callback(null ,true);
        else {
            callback(null,false);
        }
    }
}); 
export let imageUplaod = uploader.single('image');
// App.get('/',(req,res)=>res.send('h1'));
//Middlewares
App.use(cookieParser(config.SECRET));
App.use(logger('tiny'));
App.set('PORT',config.PORT);

App.listen(App.get('PORT'),()=>{
    console.log('Server on port ',App.get('PORT'));
});