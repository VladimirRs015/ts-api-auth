import {RequestHandler} from "express"
export const toBeAuthenticated:RequestHandler = (req,res,next,)=>{ 
    let message = {
        message :'You need to be authenticated'
    }
    req.isAuthenticated() ? next() : res.status(401).json(message)
}

export const notToBeAuthenticated:RequestHandler = (req,res,next,)=>{ 
    (req.isAuthenticated()) 
        ? res.status(400).send({message:'You are alredy logged'})
        : next(); 
}

