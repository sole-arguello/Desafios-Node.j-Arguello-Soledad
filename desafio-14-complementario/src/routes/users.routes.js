import {Router} from 'express';
import { authorization, jwtAuth } from '../middlewares/auth.js';
import { UsersController } from '../controller/users.controller.js';

const router = Router();
//El admin debe estar logueado y colocar un id de usuario en la ruta 
//localhost:8080/api/users/premium/:uid
router.put('/premium/:uid',jwtAuth, authorization(['admin']), UsersController.modifyRole)

export {router as usersRouter}