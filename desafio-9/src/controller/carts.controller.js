import { CartsService } from "../service/carts.service.js";

export class CartsController {
    static getCarts = async (req, res) => {
        try {
            const carts = await CartsService.getCarts();
            res.json({ message: "Listado de carritos", data: carts });
        } catch (error) {
            res.json({ status: "error", message: error.message });
        }
    }
    
}