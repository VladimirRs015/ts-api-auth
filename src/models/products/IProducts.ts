import {Document} from "mongoose"
export default interface IProducts extends Document {
    name : string
    price : number
    description? : string
    creatorId : string
    quantity? : number
    soldTotal : number
    owner : string
    isSold : boolean
    setStockProduct:(quantity:number)=>void
    sold: ()=>void
}