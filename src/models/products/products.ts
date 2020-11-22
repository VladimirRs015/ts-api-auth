import {Schema,model} from "mongoose";
import IProducts from "./IProducts"


const ProductsSchema = new Schema<IProducts>({
        name : {type:String,required:true},
        price : {type:Number,required:true,default:0},
        description: {type:String,required:false},
        creatorId : {type:String,required:true},
        quantity : {type:Number,required:true,default:1}
});
ProductsSchema.methods.addProduct = function (p:IProducts){

}
export default model<IProducts>('Product',ProductsSchema);


