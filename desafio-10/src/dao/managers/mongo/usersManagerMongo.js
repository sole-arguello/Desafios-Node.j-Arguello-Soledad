import { usersModel} from "./models/users.models.js"
import { UsersDto } from "../../dto/user.dto.js"
export class UsersManagerMongo {

    constructor() {
        this.model = usersModel
    }
    async createUsers(userInfo) {
        try {
            const newUserDto = new UsersDto(userInfo);
            //console.log('Usuario Dto', newUserDto);
            const newUser = await this.model.create(newUserDto);
            //mensaje interno
            console.log('paso por manager createUsers');          
            return newUser

        } catch (error) {
            console.log('Error en manager createUsers', error.message);
            throw new Error('No se pudo crear el usuario', error.message);
        }
        
    }
    async getUserByEmail(email){
        try {
            const user = await this.model.findOne({email})
            console.log('paso por manager getUserByEmail');
            return user
        } catch (error) {
            console.log('Error en manager getUserByEmail', error.message);
            throw new Error('El Usuario no se encuentra registrado', error.message);
        }
    }
    async getUserById(id){
        try {
            const userExist = await this.model.findById(id).lean();
            console.log('paso por manager getUserById', userExist);
            if(!userExist){
                console.log('error en manager getUserById');
                throw new Error('El Usuario no se encuentra registrado');
            }
            return userExist
        } catch (error) {
            console.log('error en manager getUserById', error.message);
            throw new Error('El Usuario no se encuentra registrado', error.message);
        }
    }
    async getUsers(){
        
        try {
            const users = await this.model.find();
            console.log('paso por manager getUsers');
            return users
        } catch (error) {
            console.log('error en manager getUsers', error.message);
            throw new Error('Los usuario no se encontraron', error.message);
        }
    }

}