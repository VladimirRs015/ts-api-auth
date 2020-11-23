import {RequestHandler} from "express";
import ProductsModel from "../../models/products/products";
import {ISimpleUser as IUser} from "../../models/Users/IUsers";
import IProducts from "../../models/products/IProducts";
// import users from "../../models/Users/users";
export const getProducts:RequestHandler = async(req,res)=>{
  let user = req.user as IUser
  try{
      let products = await ProductsModel.find({ownerId:user._id});
      res.status(200).json({
          products,
      });
  }catch(error){
      res.status(500).json({
          message : 'internal server error'
      });
  }
}
export const findAProductByName:RequestHandler = async(req,res)=>{
  let name = req.params.name;
  let products = await ProductsModel.find({name});
  res.status(200).json({
    products,
  });
}
export const editProduct:RequestHandler = async(req, res)=>{
  let id = req.params.id
  try{
    let user = req.user as IUser
    let newProduct = req.body as IProducts

    let foundProduct = await ProductsModel.findById({
      _id: id,
    });
    if (foundProduct?.ownerId !== user._id) throw {message :'this product dont belong to this user',status :401}
     
    if(!foundProduct) throw {message : 'This product does not exist',status : 500};
    let updatedProduct = await foundProduct.updateOne(newProduct);
    res.json(updatedProduct);
  }
  catch(error){
    let message = error.mesage || 'internal error server';
    let status = error.status || 500
    res.status(status).json({message});
  }
}
export const deleteProduct:RequestHandler = async(req,res)=>{
  try{

    let id = req.params.id ;
    let foundProduct = await ProductsModel.findOneAndDelete({
      _id : id
    })
    if(!foundProduct) throw {message :'the product that you was looking for dont exists ',status :404}  
    res.status(204) 
  }
  catch(error){
    let message = error.message || 'internal server error';
    let status = error.status || 500
    res.status(status).json({message});
  }
}
export const createProducts:RequestHandler = async (req,res)=>{
  let user = req.user as IUser ;
  try{
    const product = new ProductsModel({
      name : req.body.name,
      description : req.body.description,
      price : req.body.price,
      quantity : req.body.quantity,
      ownerId : user._id
    });
    let productCreated = await product.save();
    res.status(200).json(productCreated);
  }
  catch(error){
    res.status(500).json({message : "internal error server"});
  }
}






