import {RequestHandler} from "express";
import ProductsModel from "../../models/products/products";
import {ISimpleUser as IUser} from "../../models/Users/IUsers";
import IProducts from "../../models/products/IProducts";
import categories from "../../models/Categories/categories"


// operations that requires authentication
export const getUsersProducts:RequestHandler = async(req,res)=>{
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
  let user = req.user as IUser
  try{
    let id = req.params.id ;
    let foundProduct = await ProductsModel.findOneAndDelete({
      _id : id,
      ownerId : user._id
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
      ownerId : user._id,
      _model : req.body.model,
      serial : req.body.serial,
      category : req.body.category
    });
    let productCreated = await product.save();
    res.status(200).json(productCreated);
  }
  catch(error){
    
    res.status(500).json({message : "internal error server",error});
  }
}

export const showProducts:RequestHandler = async(req,res)=>{
  try{
    let foundProducts = await ProductsModel.find()
    res.status(200).json(foundProducts);
  }
  catch(error){
    res.status(500).json({
        message : 'internal server error'
    });
}
}
// show categories
export const showCategories:RequestHandler = async(req,res)=>{
  let categories = await ProductsModel.find({});
  res.status(200).json({categories})
}

export const showProductsByCategory:RequestHandler = async(req,res)=>{
  try{
    let category = req.params.category
    let foundProducts = await ProductsModel.find({
      category,
    })
    res.status(200).json(
      foundProducts[0] ? {products:foundProducts }: {message : 'there arent any available product with this category'});
  } 
  catch(error){
    res.status(500).json({
        message : 'internal server error'
    });
  
  }
}

export const searchProductsByName:RequestHandler = async(req,res)=>{
  try{
    let name = req.params.name
    let foundProducts = await ProductsModel.find({
      name : {$regex : new RegExp(`${name}`)}
    });
    res.status(200).json(
      foundProducts[0] ? {products:foundProducts }: {message : 'there arent any available product with this category'}
      );
    }
    catch(error){
      res.status(500).json({
          message : 'internal server error'
      });
    }
  }


    
