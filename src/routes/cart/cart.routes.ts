import {Router} from "express"
import {toBeAuthenticated} from "../../middlewares/Authenticated"
import {showProductsOnCart,removeProdFromCart, addProductsToCart} from "./cart.controller"
import config from "../../config/config"
const router = Router()
    ,baseRoute = `${config.API_VERSION}/cart`
    ,routeById = `${baseRoute}/:id`

router.get(baseRoute,showProductsOnCart)

router.delete(routeById,toBeAuthenticated,removeProdFromCart);

router.post(baseRoute,toBeAuthenticated,addProductsToCart);


export default router


