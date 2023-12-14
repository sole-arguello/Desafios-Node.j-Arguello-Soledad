
export class TicketRepository {
    constructor(dao){
        this.dao = dao   
    }

    async createTicket(ticketBody){
        return ticket = await this.dao.createTicket(ticketBody)
    }
    
    async getTickets(){
        return tickets = await this.dao.getTickets()
    }

    async getTicketById(ticketId){
        return idTicket = await this.dao.getTicketById(ticketId)
    }
}