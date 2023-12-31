import { Router } from 'express';
import { authorization, jwtAuth } from '../middlewares/auth.js';
import { ViewsController } from '../controller/views.controller.js';

const router = Router();

//ruta para la vista home de todos los productos
router.get('/', jwtAuth, authorization(['user', 'admin']), ViewsController.renderViewsHome)

//ruta para login
router.get('/login', authorization(['user', 'admin']), ViewsController.renderViewsLogin)

//ruta para register
router.get('/register', ViewsController.renderViewsRegister)

//ruta para el perfil de usuario
router.get('/profile', jwtAuth, authorization(['user, admin']), ViewsController.renderViewsProfile)

//ruta para productos en tiempo real crear y Eliminar 
router.get('/realTimeProducts', jwtAuth, authorization(['admin']),ViewsController.renderViewsRealTime)

//message para linkear / caht es la renderizacion hacia el chat 
router.get('/message', jwtAuth, authorization(['user, admin']),ViewsController.renderViewsMessage)

//pagiante// localhost:8080?page=1 ... 2 ...3 ..etc
router.get('/products', jwtAuth, authorization(['user', 'admin']), ViewsController.renderViewsProducts)

//ruta hardcodeada localhost:8080/cart/6525e395443bd76c765dd0ee
router.get('/cart/:cid', authorization(['user', 'admin']), ViewsController.renderViewsCart)

// viewsRouter.get("/cart", async (req, res) => {
//     const cartId = await cartsModel.findOne().sort({ carts: -1 });
//     const cart = await CartsService.getCartById(cartId,{lean:true});
//     const productsCart = cart.products;
//     res.render("cart", { products: productsCart})
// });
//http://localhost:8080/mokingProducts
router.get('/mokingProducts', ViewsController.mockingProducts)

export { router as viewsRouter }




