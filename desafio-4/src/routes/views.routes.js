import { Router } from 'express';
import { productsService } from '../persistence/index.js';
const router = Router();

//ruta para la vista home de todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await productsService.getProducts();
        const existProducts = products.length > 0;
        if (existProducts) {
            res.render('home', { products : products });//podria ir solo products
        }else{
            res.render('No hay productos para mostrar');
        }
        
    } catch (error) {
       res.status(500).json({ message: error.message }); 
    }
   
})

//ruta para productos en tiempo real Eliminar 
router.get('/realTimeProducts', (req, res) => {
    try {
        res.render('realTime');
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
})


export { router as viewsRouter }