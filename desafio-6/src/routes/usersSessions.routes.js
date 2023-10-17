import { Router } from "express";

import { usersService } from "../dao/index.js";

const router = Router();

router.post('/login', async (req, res) => {
    try {
        const loginUser = req.body;
        const user = await usersService.getUser(loginUser.email);
    
        if(!user) {
            return res.render('login', {errorLogin: 'Usuario no registrado'});
        }
        //verifico usuario y contrasena coincida con las de la base
        if(user.password !== loginUser.password) {
            return res.render('login', {errorLogin: 'Credenciles invalidas'});
        }
        //si todo es ok 
        req.session.first_name = user.first_name;
        req.session.last_name = user.last_name;
        req.session.age = user.age;
        req.session.email = user.email;
        req.session.role = user.role;
        res.redirect('/');//redirecciono a home y ya tiene acceso a navegar en la page
                
    } catch (error) {
        res.render('login', {error: 'No se pudo iniciar sesion, para este usuario'});
    }

})

router.post('/register', async (req, res) => {
    try {
        const newUser = req.body;
        const result = await usersService.createUsers(newUser);
        res.render('login', {message: 'Usuario registrado con exito'});
    } catch (error) {
        res.render('register', {error: 'No se pudo registrar el usuario'});
    }
})

export { router as usersSessionsRouter}