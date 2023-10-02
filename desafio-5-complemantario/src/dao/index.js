// import { ProductManager } from "./files/productManager.js";
// import { CartsManager } from './files/cartsManager.js';
import { __dirname } from "../utils.js";
//import path from "path";


import { ProductsManagerMongo } from './mongo/productsManagerMongo.js';
import { CartsManagerMongo } from './mongo/cartsManagerMongo.js'
import { ChatManagerMongo } from "./mongo/chatManagerMongo.js";

export const productsService = new ProductsManagerMongo();
export const cartsService = new CartsManagerMongo();
export const chatService = new ChatManagerMongo();

//console.log('dirname', path.join(__dirname, '/files'));

// export const productsService = new ProductManager(path.join(__dirname, '/data/products.json'));
// export const cartsService = new CartsManager(path.join(__dirname, '/data/carts.json'));