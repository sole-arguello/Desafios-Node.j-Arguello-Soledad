import { config } from "../config/config.js";
import { __dirname } from "../utils.js";
import path from "path";
import { UsersManagerMongo } from "../dao/managers/mongo/usersManagerMongo.js";

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
let usersSessionsDao;
let ticketDao;

const enviroment = config.enviroment.persistence;

switch (enviroment) {
  case "production": {
    //Mongo DB
    const { connectDB } = await import("../config/dbConnection.js");
    connectDB.getInstance()

    //Products
    const { ProductsManagerMongo } = await import(
      "../dao/managers/mongo/productsManagerMongo.js"
    );
    productsDao = new ProductsManagerMongo();

    //Carts
    const { CartsManagerMongo } = await import(
      "../dao/managers/mongo/cartsManagerMongo.js"
    );
    cartsDao = new CartsManagerMongo();

    //Chat
    const { ChatManagerMongo } = await import(
      "../dao/managers/mongo/chatManagerMongo.js"
    );
    chatDao = new ChatManagerMongo();

    //Users
    const { UsersManagerMongo } = await import(
      "../dao/managers/mongo/usersManagerMongo.js"
    );
    usersSessionsDao = new UsersManagerMongo();

    //tikets
    const { TicketManagerMongo } = await import(
      "./managers/mongo/ticketManagerMongo.js"
    );
    ticketDao = new TicketManagerMongo();

    console.log("Estoy en el entorno de produccion");
    break;
  }
  //////////////////////////////////////////////////////////////////////////////////////////

  case "development": {
    ///files system

    //Products
    const { ProductsManagerFs } = await import(
      "./managers/fileSystemManagers/productManagerFs.js"
    );
    productsDao = new ProductsManagerFs(
      path.join(__dirname, "../dao/managers/fileSystemManagers/files/products.json")
    );

    //Carts
    const { CartsManagerFs } = await import(
      "./managers/fileSystemManagers/cartsManagerFs.js"
    );
    cartsDao = new CartsManagerFs(
      path.join(__dirname, "../dao/managers/fileSystemManagers/files/carts.json")
    );

    console.log("Estoy en el entorno de desarrollo");
    break;
  }
}

export { productsDao, cartsDao, chatDao, usersSessionsDao, ticketDao };
