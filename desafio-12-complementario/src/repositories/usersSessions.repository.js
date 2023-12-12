

export class UsersSessionsRepository {

    constructor(dao){
        this.dao = dao
    }

    async createUsers(infoUser){
        return user = await this.dao.createUsers(infoUser)
    }
    async getUserByEmail(email){
        return userEmail = await this.dao.getUserByEmail(email)
    }
    async getUserById(id){
        return userId = await this.dao.getUserById(id)
    }
    async getUsers(){
        return users = await this.dao.getUsers()
    }
}