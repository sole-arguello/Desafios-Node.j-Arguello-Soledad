import { Router } from "express";

import { usersService } from "../dao/index.js";

const router = Router();

router.post('/login', async (req, res) => {

    //const loginUser = req.body;
    
})

router.post('/register', async (req, res) => {
    try {
        const newUser = req.body;
        const result = await usersService.createUsers(newUser);
        res.render('login', {errorRegister: 'Se registro el usuario con exito'});
    } catch (error) {
        res.render('register', {errorRegister: 'No se pudo registrar el usuario'});
    }
})

export { router as usersSessionsRouter}