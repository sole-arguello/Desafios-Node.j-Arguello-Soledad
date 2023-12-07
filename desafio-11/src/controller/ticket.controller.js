import { ticketService } from '../repositories/index.js'

export class TicketController {
    
    static createTicket = async (req, res) => {

        try {

            console.log('paso por createTicket controller');
            const ticketBody = req.body;
            const newTicket = await ticketService.createTicket(ticketBody);
            res.json({ message: "Ticket creado", data: newTicket });
            
        } catch (error) {
            res.json({ status: "error", message: error.message });
        }
    }
    static getTicket = async (req, res) => {
        try {
            console.log('getTicket controller');
            const ticket = await ticketService.getTicket();
            res.json({ message: "Listado de tickets", data: ticket });
            
        } catch (error) {
            console.log('error getTicket controller', error.message);
            res.json({ status: "error", message: error.message });
        }
    }
    static getTicketById = async (req, res) => {
        try {
            console.log('getTicketById controller');
            const ticketId = req.params.id;
            const ticket = await ticketService.getTicketById(ticketId);
            res.json({ message: "Listado de tikets", data: ticket });
            
        } catch (error) {
            console.log('error getTiketById controller', error.message);
            res.json({ status: "error", message: error.message });
        }
    }
}