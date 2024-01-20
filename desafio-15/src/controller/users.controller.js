import { logger } from "../helpers/logger.js";
import { usersSessionsService } from "../repositories/index.js";

export class UsersController{

    static modifyRole = async (req, res) => {
        try {
            const userId = req.params.uid.toString();
            logger.info("paso por modifyRole controller");
            const user = await usersSessionsService.getUserById(userId);
            //logger.info('debug user exist', user)
           if(user.role === 'premium'){
                user.role = 'user'
           }else if(user.role === 'user'){
                user.role = 'premium'
           }else{
            res.json({ status: "error", message: "No se puede cambiar el rol de este usuario" });
           }
            await usersSessionsService.updateUser(userId, user);//user._id, user
            logger.info("Rol modificado");
            res.json({ status: "success", message: "Rol modificado" });
        } catch (error) {
            logger.error("Se produjo un error en modifyRole controller", error.message);
            res.json({ status: "error", message: error.message });
        }
    }

    static uploaderUserDocuments = async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await usersSessionsService.getUserById(userId);
            console.log('user', user)
            console.log('documentos', req.files) 

        } catch (error) {
            logger.error("Se produjo un error en uploaderUserDocuments controller", error.message);
            res.json({ status: "error", message: error.message });
        }
    }
}