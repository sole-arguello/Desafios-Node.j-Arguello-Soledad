

export class UsersManagerMongo {

    constructor() {
        this.usersModel = this.usersModel
    }

    async createUsers(userInfo) {
        try {
            const newUser = await this.usersModel.create(userInfo);
            return newUser
        } catch (error) {
            console.log('crear usuario', error.message);
            throw new Error('No se pudo crear el usuario', error.message);
        }
        
    }


}