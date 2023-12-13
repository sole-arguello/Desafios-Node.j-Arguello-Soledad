import { usersModel} from "./models/users.models.js"
import { UsersDto } from "../../dto/user.dto.js"
import { logger } from "../../../helpers/logger.js";
import { error } from "console";
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
            logger.info('paso por manager createUsers');          
            return newUser

        } catch (error) {
            logger.error('Error en manager createUsers', error.message);
            throw new Error('No se pudo crear el usuario', error.message);
        }
        
    }
    async getUserByEmail(email){
        try {
            const user = await this.model.findOne({email})
            return user
        } catch (error) {
            logger.error(error.message);
            throw new Error('El Usuario no se encuentra registrado', error.message);
        }
    }
    async getUserById(id){
        try {
            const userExist = await this.model.findById(id).lean();
            if(!userExist){
                logger.error(error.message);
                throw new Error('El Usuario no se encuentra registrado');
            }
            return userExist
        } catch (error) {
            logger.error(error.message);
            throw new Error('El Usuario no se encuentra registrado', error.message);
        }
    }
    async getUsers(){
        
        try {
            const users = await this.model.find();
            return users
        } catch (error) {
            logger.error(error.message);
            throw new Error('Los usuario no se encontraron', error.message);
        }
    }

}