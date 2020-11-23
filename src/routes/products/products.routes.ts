import {Router} from "express"
import {toBeAuthenticated} from "../../middlewares/Authenticated"
import {getProducts,deleteProduct,createProducts,editProduct,findAProductByName} from "./products.controller"
const router = Router();
// Only users 
router.get('/products',toBeAuthenticated,getProducts);

router.delete('/products/:id',toBeAuthenticated,deleteProduct);

router.get('/products/:name',toBeAuthenticated,findAProductByName);
// router.post('/products',toBeAuthenticated,);
router.put('/products/:id',toBeAuthenticated,editProduct);

router.post('/products',toBeAuthenticated,createProducts);


// all clients



export default router;