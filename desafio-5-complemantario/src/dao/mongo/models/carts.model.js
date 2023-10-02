import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                productId: String,
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []//para cuando se cree los productos se cree el carrito vacio
    }
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);