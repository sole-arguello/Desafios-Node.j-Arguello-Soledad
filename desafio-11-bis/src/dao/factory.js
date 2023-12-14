
import { __dirname } from "../utils.js";
import path from 'path';
import { config } from "../config/config.js";
import { logger } from "../helpers/looger.js";


// import { ProductsManagerMongo } from './managers/mongo/productsManagerMongo.js';
// import { CartsManagerMongo } from './managers/mongo/cartsManagerMongo.js'
// import { ChatManagerMongo } from "./managers/mongo/chatManagerMongo.js";
// import { UsersManagerMongo } from "./managers/mongo/usersManagerMongo.js";
// import { TiketManagerMongo } from "./managers/mongo/tiketManagerMongo.js";

// export const productsDao = new ProductsManagerMongo();
// export const cartsDao = new CartsManagerMongo();
// export const chatDao = new ChatManagerMongo();
// export const usersDao = new UsersManagerMongo();
// export const tiketDao = new TiketManagerMongo()

let productsDao;
let cartsDao;
let chatDao;
let usersSessionDao;
let ticketDao;

const enviroment = config.enviroment.persistence

switch(enviroment){
    case 'production': {
        //mongo db
        const { connectDB } = await import("../config/dbConnection.js");
        connectDB.getInstance();

        //products
        const { ProductsManagerMongo } = await import('../dao/managers/mongo/productsManagerMongo.js');
        productsDao = new ProductsManagerMongo();

        //carts
        const { CartsManagerMongo } = await import('../dao/managers/mongo/cartsManagerMongo.js');
        cartsDao = new CartsManagerMongo();

        //chat
        const { ChatManagerMongo } = await import('../dao/managers/mongo/chatManagerMongo.js');
        chatDao = new ChatManagerMongo();

        //users
        const { UsersManagerMongo } = await import('../dao/managers/mongo/usersManagerMongo.js');
        usersSessionDao = new UsersManagerMongo();

        //tickets
        const { TicketManagerMongo } = await import('../dao/managers/mongo/ticketManagerMongo.js');
        ticketDao = new TicketManagerMongo();

        logger.info('Estoy en el entorno de produccion');
        break;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////

    case 'development': {
        //files system

        //products
        const { ProductManagerFs } = await import('./managers/fileSystem/productManagerFs.js');
        productsDao = new ProductManagerFs(path.join(__dirname, '/dao/managers/fileSystem/files/products.json'));
    
        //carts
        const { CartsManagerFs } = await import('./managers/fileSystem/cartsManagerFs.js');
        cartsDao = new CartsManagerFs(path.join(__dirname, '/dao/managers/fileSystem/files/carts.json'));

        logger.info('Estoy en el entorno de desarrollo');
        break;
    }

}

export{ productsDao, cartsDao, chatDao, usersSessionDao, ticketDao }