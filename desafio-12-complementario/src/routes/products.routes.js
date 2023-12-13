import { logger } from '../helpers/logger.js';
import {Router } from 'express';
import { ProductsController } from '../controller/products.controller.js'; 
import { authorization, jwtAuth } from '../middlewares/auth.js';



const router = Router();
//RUTA PARA PROBAR LOGGERS SEGUN ENTORNO DE TRABAJO
//http://localhost:8080/loggerTest
router.get("/loggerTest", (req, res) => {
    logger.debug("Soy un mensaje DEBUG");
    logger.verbose("Soy un mensaje VERBOSE");
    logger.http("Soy un mensaje HTTP");
    logger.info("Soy un mensaje INFO");
    logger.warn("Soy un mensaje WARN");
    logger.error("Error fatal")
    res.json({ status: "success", message: "Petición recibida" });
  });

router.get('/', ProductsController.getProducts)

router.get('/:id', ProductsController.getProductById)

//todas estas rutas llevan autorizacion
//localhost:8080/api/products
router.post('/', jwtAuth, authorization(['admin']), ProductsController.createProduct)

router.put('/:id', jwtAuth,  authorization(['admin']), ProductsController.updateProduct)

router.delete('/:id', jwtAuth, authorization(['admin']), ProductsController.deleteProduct)

export { router as productsRouter }