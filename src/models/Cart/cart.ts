import {model, Schema} from "mongoose";
import ICart from "./ICart"
import IProducts from "../products/IProducts"
import ProductsSchema from "../products/products"
const CartSchema = new Schema({
   quantity : {type:Number,required:true,default:0},
   productId : {type:String,required:true},
   userId : {type:String,required:true}
});
CartSchema.pre('save',async function(next){
    let cartItem = this as ICart
    let foundProduct = await ProductsSchema.find({_id:cartItem.id});
    if(!foundProduct) return next(new Error('This product cannot be added to the cart because it does not exist'));
    next();
});

// CartSchema.methods.addToCart = async function(product:IProducts){
//     let cart = this as ICart
//     cart
//     cart.save();
// }
export default model<ICart>('Cart',CartSchema)