import { ticketModel } from "./models/tickets.model.js";

export class TicketManagerMongo {
  constructor() {
    this.model = ticketModel;
  }

  async createTicket(ticketBody) {
    try {
      const ticket = await this.model.create(ticketBody);
      console.log("paso por manager createTicket");
      return ticket;
    } catch (error) {
      console.log("Error en manager createTicket", error.message);
      throw new Error("No se pudo crear el ticket ", error.message);
    }
  }

  async getTickets() {
    try {
      const tickets = await this.model.find().lean();
      console.log("paso por manager getTikets");
      return tickets;
    } catch (error) {
      console.log("Error en manager getTickets", error.message);
      throw new Error(
        "No se pudo obtener el listado de los tikets ",
        error.message
      );
    }
  }

  async getTicketById(id) {
    try {
      const tickets = await this.model.findById(id).lean();
      console.log("paso por getTicketById");
      return tickets;
    } catch (error) {
      console.log("Error en manager getTiketById", error.message);
      throw new Error("No se pudo obtener el tiket ", error.message);
    }
  }
}
