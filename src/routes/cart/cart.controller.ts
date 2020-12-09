import {RequestHandler} from "express"
import CartModel from "../../models/Cart/cart"
import products from "../../models/products/products"
import IProduct from "../../models/products/IProducts"
import IUsers from "../../models/Users/IUsers"

export const showProductsOnCart :RequestHandler  = async (req,res)=>{
    try{
        if(!req.isAuthenticated())return res.status(200).json({productsOnCart : []})
        let user = req.user as IUsers
        let productsOnCart = await CartModel.find({userId : user.id});
        res.status(200).json({productsOnCart})
    }
    catch(error){
        res.status(500).json({message : 'internal server error'});
    }
}

export const addProductsToCart :RequestHandler  = async (req,res)=>{
    let productId = req.body.productId 
    let quantity = req.body.quantity
    try{
        let user = req.user as IUsers
        let newProduct = new CartModel({
            userId : user._id, 
            productId,
            quantity
        });
        let saveRes = await newProduct.save();
        res.status(201).json({productOnCart : saveRes});
    }
    catch(error){
        res.status(500).json({message : 'internal server error'});
    }
}

export const removeProdFromCart :RequestHandler  = async (req,res)=>{
    let _id = req.params.id
    try{
        let foundProduct = await CartModel.findOneAndDelete({_id});
        if(!foundProduct)return res.status(404).json({message :'product not found'})
        res.status(204)
    }
    catch(error){
        res.status(500).json({message : 'internal server error'});
    }
}

// export const showProductsOnCart :RequestHandler  = async (req,res)=>{

// }