import { productsService} from '../repositories/index.js'
import { CustomError } from '../service/errors/customErrors.js';
import { generateProductErrorInfo } from '../service/errors/infoDictionary.js';
import { EError } from '../service/errors/enums.js';
import { logger } from '../helpers/logger.js';

export class ProductsController {

    static createProduct = async (req, res, next) => {
        try {
            logger.info('paso por createProduct controller', req.user);
            const productInfo = req.body;
            productInfo.owner = req.user._id;
            if (!productInfo) {
                CustomError.createError({
                    name: "Error al crear el producto",
                    cause: generateProductErrorInfo(req.body),
                    message: "Campos incompletos",
                    code: EError.INVALID_TYPES_ERROR
                })
            }
            const newProduct = await productsService.createProduct(productInfo);
            res.json({ status: 'success', message: "Producto creado", data: newProduct });
        } catch (error) {
            logger.error('error createProduct controller', error.message);
            next(error);
        }
    }
    static getProducts = async (req, res) => {
        try {
            logger.info('paso por getProducts controller');
            const products = await productsService.getProducts()
            res.json({ message: "Listado de productos", data: products });
        } catch (error) {
            logger.error('error getProducts controller', error.message);
            res.json( { status: "error", message: error.message });
        }
    }
    static getProductById = async (req, res) => {
        try {
            const productId = req.params.id;
            const products = await productsService.getProductById(productId);
            logger.info('Lista de productos', products);
            res.json({ message: "Listado de productos", data: products });
        } catch (error) {
            logger.error('error getProductById controller', error.message);
            res.json( { status: "error", message: error.message });
        }
    }
    static updateProduct = async (req, res) => {
        try {
            
            const productId = req.params.id;
            const product = req.body;
            const updatedProduct = await productsService.updateProduct(productId, product);
            logger.info('Producto actualizado', updatedProduct);
            res.json({ message: "Producto actualizado", data: updatedProduct });
        } catch (error) {
            logger.error('error updateProduct controller', error.message);
            res.json( { status: "error", message: error.message });
        }
    }
    static deleteProduct = async (req, res) => {
        try {
            const productId = req.params.id;
            const deletedProduct = await productsService.deleteProduct(productId);
            logger.info('Producto eliminado', deletedProduct);
            res.json({ message: "Producto eliminado", data: deletedProduct });
        } catch (error) {
            logger.error('error deleteProduct controller', error.message);
            res.json( { status: "error", message: error.message });
        }
    }
}