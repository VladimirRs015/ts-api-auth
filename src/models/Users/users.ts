import {Schema,model} from "mongoose";
import bcrypt from "bcrypt";
import IUsers from "./IUsers";

const Users = new Schema({
  name : {type:String,required:true},
  lastname : {type:String,required:true},
  password : {type:String,required:true,select:true},
  email :{type:String,required:true ,unique:true},
  status :{type:String ,enum:[ 
    'active',
    'inactive',
    'suspended'
  ],required:true,default:'active'},
  images : {type:[String] , required:false,default:[]},
  profile_img: {type:String,required:false,default:'defaultImage'}
},{timestamps:true});


Users.pre('save',async function(next:Function){
  let user = this as IUsers;
  if(!user.isModified('password')) return next();
  try{
    let salt = await bcrypt.genSalt(7)
      if(user.password){
       user.password = await bcrypt.hash(user.password,salt);
       return next()
      }
    } 
    catch(error){
      next(error)
    }
  return next();
})
// Must return a object that implements IUsers interface
Users.methods.validPassword = async function(password:string){
 let user:IUsers = this as IUsers
 let res = await bcrypt.compare(password,user.password)
 return res
}
export default model<IUsers>('Users',Users);