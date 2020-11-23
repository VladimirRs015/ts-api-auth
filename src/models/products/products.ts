import {Schema,model} from "mongoose";
import IProducts from "./IProducts"


const ProductsSchema = new Schema<IProducts>({
        name : {type:String,required:true},
        serial : {type:String,required:false,default:""}, 
        _model : {type:String,required:false,default:""}, 
        price : {type:Number,required:true,default:0},
        description: {type:String,required:false},
        creatorId : {type:String,required:true},
        quantity : {type:Number,required:true,default:1},
        isSold : {type:Boolean,required:true,default:false}, 
        ownerId: {type:String,required:true},
});
ProductsSchema.methods.setStockProduct = function (number){
  let product = this as IProducts
}
ProductsSchema.methods.sold = function (number){
  let product = this as IProducts
}


export default model<IProducts>('Product',ProductsSchema);


