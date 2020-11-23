import {Document} from "mongoose"
import IUser from "../Users/IUsers"
export default interface IProducts extends Document {
    name : string,
    _model : string
    serial:string
    price : number
    description? : string
    quantity? : number
    soldTotal?: number
    ownerId : string
    isSold : boolean
    setStockProduct:(quantity:number)=>void
    sold: (to:IUser)=>void
}