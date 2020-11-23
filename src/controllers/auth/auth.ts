// import App from "../../App";
import {RequestHandler, Router} from "express"
import passport ,{AuthenticateOptions} from "passport";
import UserModel from "../../models/Users/users"
import {ISimpleUser} from "../../models/Users/IUsers";
import users from "../../models/Users/users";
import { notToBeAuthenticated, toBeAuthenticated } from "../../middlewares/Authenticated";
const router = Router();

const signUpHandler:RequestHandler = (req,res)=>{
    const {images,profile_img,name,lastname,email,_id}:ISimpleUser  = req.user as ISimpleUser;
    res.status(200).json({
        images,
        profile_img,
        name,
        lastname,
        email,
        _id,
    });
}

router.post('/signin',
   [
    notToBeAuthenticated,
    passport.authenticate('local',{
    failureMessage:'The username or the password is incorrect',
})],signUpHandler);

router.get('/signout',toBeAuthenticated,(req,res)=>{
    req.logout()
    res.status(200).json({
        message : 'session closed'
    })
});

router.post('/signup',async (req,res)=>{
    try{
        let newUser = new UserModel({
            name : req.body.name,
            lastname : req.body.lastname,
            email : req.body.email,
            password : req.body.password
        });
       let userFound = await UserModel.findOne({email:req.body.email})
       if(userFound) throw {message :"This email is already in use"}
        let userCreated = await newUser.save();
        res.status(201).json(userCreated);
    }
    catch(error){
        const message = error.message || 'You have to fill all the fields'
        res.status(400).json({message});
    }
});

export default router