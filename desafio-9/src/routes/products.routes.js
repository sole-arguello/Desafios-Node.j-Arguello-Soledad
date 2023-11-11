import {Router } from 'express';
import { ProductsController } from '../controller/products.controller.js'; 


const router = Router();

router.get('/', ProductsController.getProducts)

router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const resultado = await productsService.getProductById(productId);
        res.json({ status: 'success', data: resultado });
    }
    catch (error) {
        res.json({ status: 'error',  message: error.message });
    }
})
//localhost:8080/api/products
router.post('/', async (req, res) => {
    try {
        const productInfo = req.body;//cargo los datos en postman
        const resultado = await productsService.createProduct(productInfo);
        res.json({ status: 'success', data: resultado });
    } catch (error) {
        res.json({ status: 'error',  message: error.message });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = req.body;
        const resultado = await productsService.updateProduct(id, product);
        res.json({ status: 'success', data: resultado });
    }
    catch (error) {
        res.json({ status: 'error',  message: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await productsService.deleteProduct(id);
        res.json({ status: 'success', data: resultado });
    }
    catch (error) {
        res.json({ status: 'error',  message: error.message });
    }
})

export { router as productsRouter }