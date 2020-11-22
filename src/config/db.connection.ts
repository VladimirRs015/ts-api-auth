import mongoose from "mongoose";
import config from "./config";
let db;
(async()=>{
    try{
        db = await mongoose.connect(config.MONGO_DB,{useNewUrlParser:true,useUnifiedTopology:true});
    }
    catch(error){
        console.log('There was an error trying to connect to database ');
    }
 if(db){
    // console.log(db);
    console.log('Backend connected to the database');
 }
})()
export default db;