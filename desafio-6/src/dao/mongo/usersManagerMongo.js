
import { usersModel} from "./models/users.models.js"
export class UsersManagerMongo {

    constructor() {
        this.model = usersModel
    }

    async createUsers(userInfo) {
        try {
            const newUser = await this.model.create(userInfo);
            return newUser
        } catch (error) {
            console.log('crear usuario', error.message);
            throw new Error('No se pudo crear el usuario', error.message);
        }
        
    }


}