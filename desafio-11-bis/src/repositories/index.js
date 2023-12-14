import { CartsRepository } from "./carts.repository";
import { ProductsRepository } from "./products.repository";
import { UsersSessionsRepository } from "./usersSessions.repository";
import { TicketRepository } from "./tickets.repository";
import { ChatRepository } from "./chat.repository";

import { cartsDao, productsDao, usersSessionsDao, ticketsDao, chatDao } from "../daos/index.js";

export const cartsService = new CartsRepository(cartsDao);
export const productsService = new ProductsRepository(productsDao);
export const usersSessionsService = new UsersSessionsRepository(usersSessionsDao);
export const ticketsService = new TicketRepository(ticketsDao);
export const chatService = new ChatRepository(chatDao);
