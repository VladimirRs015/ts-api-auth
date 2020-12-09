import {Schema,model} from "mongoose";
import IProducts from "./IProducts"
import categorySchema from "../Categories/categories"
import IUser from "../Users/IUsers"
const ProductsSchema = new Schema<IProducts>({
        name : {type:String,required:true},
        serial : {type:String,required:false,default:""}, 
        _model : {type:String,required:false,default:""}, 
        price : {type:Number,required:true,default:0},
        description: {type:String,required:false},
        quantity : {type:Number,required:true,default:1},
        isSold : {type:Boolean,required:true,default:false}, 
        ownerId: {type:String,required:true},
        category: {type:String, required:true},
        images : {type:[String], required:false,},
});

ProductsSchema.pre('save',async function (next){
  let product = this as IProducts
  let foundCategory = await categorySchema.find({category:product.category});
  if(!foundCategory){
    next(new Error('The given category is not valid'));
  }
  next();
});

ProductsSchema.methods.setStockProduct = function (quantity:number){
  let product = this as IProducts
  product.quantity = quantity 
  return product
}

ProductsSchema.methods.sold = function (to:IUser,quantity:number){
  let product = this as IProducts
  if(product.quantity != 0 || product.quantity >= quantity  ){
    product.quantity -= quantity;
    if(product.quantity === 0){
      product.isSold = true 
    }
  }
  else{
    throw new Error('There arent anougt products to make this sell') ;
  }
  return product
}


export default model<IProducts>('Product',ProductsSchema);


