
import { __dirname } from "../utils.js";


import { ProductsManagerMongo } from './managers/mongo/productsManagerMongo.js';
import { CartsManagerMongo } from './managers/mongo/cartsManagerMongo.js'
import { ChatManagerMongo } from "./managers/mongo/chatManagerMongo.js";
import { UsersManagerMongo } from "./managers/mongo/usersManagerMongo.js";

export const productsService = new ProductsManagerMongo();
export const cartsDao = new CartsManagerMongo();
export const chatService = new ChatManagerMongo();
export const usersService = new UsersManagerMongo();

