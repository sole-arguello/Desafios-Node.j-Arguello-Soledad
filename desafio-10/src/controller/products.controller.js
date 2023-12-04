import { ProductsService} from '../service/products.service.js'
import { CustomError } from '../service/errors/customErrors.js';
import { generateProductErrorInfo } from '../service/errors/infoDictionary.js';
import { EError } from '../service/errors/enums.js';

export class ProductsController {

    static createProduct = async (req, res, next) => {
        try {
            console.log('paso por createProduct controller');
            const { title, description, code, price, status, stock, category, thumbnails } = req.body;
            if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
                CustomError.createError({
                    name: "Error de creacion de producto",
                    cause: generateProductErrorInfo(req.body),
                    message: "Error al crear el producto, campos incompletos",
                    code: EError.INVALID_TYPES_ERROR
                })
            }
            const product = req.body;
            const newProduct = await ProductsService.createProduct(product);
            res.json({ status: 'success', message: "Producto creado", data: newProduct });
        } catch (error) {
            next(error);
        }
    }
    static getProducts = async (req, res) => {
        try {
            console.log('paso por getProducts controller');
            const products = await ProductsService.getProducts()
            res.json({ message: "Listado de productos", data: products });
        } catch (error) {
            console.log('error getProducts controller', error.message);
            res.json( { status: "error", message: error.message });
        }
    }
    static getProductById = async (req, res) => {
        try {
            console.log('paso por getProductById controller');
            const productId = req.params.id;
            const products = await ProductsService.getProductById(productId);
            res.json({ message: "Listado de productos", data: products });
        } catch (error) {
            console.log('error getProductById controller', error.message);
            res.json( { status: "error", message: error.message });
        }
    }
    static updateProduct = async (req, res) => {
        try {
            console.log('paso por updateProduct controller');
            const productId = req.params.id;
            const product = req.body;
            const updatedProduct = await ProductsService.updateProduct(productId, product);
            res.json({ message: "Producto actualizado", data: updatedProduct });
        } catch (error) {
            console.log('error updateProduct controller', error.message);
            res.json( { status: "error", message: error.message });
        }
    }
    static deleteProduct = async (req, res) => {
        try {
            console.log('paso por deleteProduct controller');
            const productId = req.params.id;
            const deletedProduct = await ProductsService.deleteProduct(productId);
            res.json({ message: "Producto eliminado", data: deletedProduct });
        } catch (error) {
            console.log('error deleteProduct controller', error.message);
            res.json( { status: "error", message: error.message });
        }
    }
}