import {Document} from "mongoose";
export enum status {
    'active',
    'inactive',
    'suspended',
}
export default interface IUsers extends Document {
    _id: string,
    name : string,
    lastname : string,
    email : string,
    password : string,
    status :status ,
    images? : string[],
    profile_img?: string,
    validPassword:(password:string)=>boolean
}
export interface ISimpleUser {
    _id: string,
    name : string,
    lastname : string,
    email : string,
    password? : string,
    status :status ,
    images? : string[],
    profile_img?: string,
    validPassword:(password:string)=>boolean  
}