import {Schema,model} from "mongoose";

const CategoriesSchema = new Schema({
    category: {type:[String],required:true,default:[
        'Clothes',
        'Consoles and videogames',
        'Houses',
        'Computers',
    ]}, 
});

export default model('Categories',CategoriesSchema);

