import express from "express"
import expressSession, { Cookie } from "express-session";
import passport from "passport";
import {Strategy as LocalStrategy } from "passport-local"
import IUser from "./models/Users/IUsers";
import UserModel from "./models/Users/users";
import CookiePaser from "cookie-parser"
import {v4 as uuid} from "uuid"
import cors from "cors"
// Routes 
import Auth from "./controllers/auth/auth";
import Products from "./routes/products/products.routes"

import config from './config/config'
// Middlewares
const App = express();
App.use(express.json());
App.use(CookiePaser(config.SECRET));
App.use(express.urlencoded({extended:true}));
App.use(cors({origin:'*'}))
App.use(expressSession({
    secret: config.SECRET ,
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false,
      path:'/',
      // 24 ahours 30*24*60*60*1000
      maxAge : 24 * 60 * 60 ,
      httpOnly:true,
     },
     genid(req){
       return uuid();
     }
}));

App.use(passport.initialize());
App.use(passport.session(
));

// passport config 
passport.serializeUser(function(user:IUser, done:Function) {
    done(null, user._id);
});
  
passport.deserializeUser(function(id:string, done) {
    UserModel.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
      usernameField:'email',
      passwordField:'password'
    },
      async (email,password,done)=>{
          let user = await UserModel.findOne({
              email,
          })
          if(user)
              if(!await user.validPassword(password))
                  return done(null,false,{message:'Wrong password'})
              else
								return done(null,user)
          else
            return done(null,false,{message:'Worng email'}); 
  })); 
App.use(`${config.API_VERSION}/auth` ,Auth);
App.use(`${config.API_VERSION}` ,Products);



export default App;
