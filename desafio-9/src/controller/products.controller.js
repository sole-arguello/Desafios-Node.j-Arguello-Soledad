import { ProductsService} from '../service/products.service.js'


export class ProductsController {
    static getProducts = async (req, res) => {
        try {
            const products = await ProductsService.getProducts()
            res.json({ message: "Listado de productos", data: products });
        } catch (error) {
            res.json( { status: "error", message: error.message });
        }
    }
}