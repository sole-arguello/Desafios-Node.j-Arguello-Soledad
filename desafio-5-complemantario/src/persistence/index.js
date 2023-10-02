import { ProductManager } from "./files/productManager.js";
import { CartsManager } from './files/cartsManager.js';
import { __dirname } from "../utils.js";
import path from "path";

import { ProductsManagerMongo } from "./dao/mongo/productsManagerMongo.js";
import { CartsManagerMongo } from "./dao/mongo/cartsManagerMongo.js";


export const productsServiceMongo = new ProductsManagerMongo()
export const cartsServiceMongo = new CartsManagerMongo();

//console.log('dirname', path.join(__dirname, '/files'));

export const productsService = new ProductManager(path.join(__dirname, '/data/products.json'));
export const cartsService = new CartsManager(path.join(__dirname, '/data/carts.json'));