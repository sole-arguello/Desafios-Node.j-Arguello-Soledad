

export class TicketsRepository {

    constructor(dao){
        this.dao = dao
    }

    async createTicket(ticketBody){
        return ticket = await this.dao.createTicket(ticketBody)
    }
    
    async getTickets(){
        return tickets = await this.dao.getTickets()
    }

    async getTiketById(ticketId){
        return idTicket = await this.dao.getTiketById(ticketId)
    }
}