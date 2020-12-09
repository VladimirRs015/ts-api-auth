import {Router} from "express"
import {toBeAuthenticated} from "../../middlewares/Authenticated"
import {getUsersProducts,deleteProduct,createProducts,editProduct,findAProductByName ,showProducts,showCategories,showProductsByCategory,searchProductsByName} from "./products.controller"
const router = Router();
// Only users 
router.get('/products',toBeAuthenticated,getUsersProducts);

router.delete('/products/:id',toBeAuthenticated,deleteProduct);

router.get('/products/:name',toBeAuthenticated,findAProductByName);
// router.post('/products',toBeAuthenticated,);
router.put('/products/:id',toBeAuthenticated,editProduct);

router.post('/products',toBeAuthenticated,createProducts);
// all clients
router.get('/buy',showProducts);

router.get('/products/categories',showCategories);

router.get('/products/related',showProductsByCategory);

router.get('/buy/search/:name',searchProductsByName);
export default router;