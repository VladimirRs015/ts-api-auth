// import IProducts from "../products/IProducts";
import {Document} from "mongoose";
export default interface ICart extends Document{
    _id : string
    productId: string
    quantity : number
    userId :string
    // addToCart:(product:IProducts)=>void
}


