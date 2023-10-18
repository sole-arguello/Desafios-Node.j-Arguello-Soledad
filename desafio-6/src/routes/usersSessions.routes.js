import { Router } from "express";

import { usersService } from "../dao/index.js";

const router = Router();
//logueo al usuario se admin o usuario
router.post('/login', async (req, res) => {
    try {

        const loginUser = req.body;
        console.log(loginUser.email, loginUser.password);
        if(loginUser.email === 'admin@coder.com' && loginUser.password === 'admin') {
            req.session.email = loginUser.email
            req.session.role = 'admin'
        }else{
            const user = await usersService.getUser(loginUser.email);
            //verifico si el usuario existe
            if(!user) {
                return res.render('login', {error: 'Usuario no registrado'});
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
        }
                
    } catch (error) {
        res.status(500).render('login', {error: 'No se pudo iniciar sesion, para este usuario'});
    }

})
//registro al ususario
router.post('/register', async (req, res) => {
    try {
        const newUser = req.body;
        const result = await usersService.createUsers(newUser);
        res.render('login', {message: 'Usuario registrado con exito'});
    } catch (error) {
        res.status(500).render('register', {error: 'No se pudo registrar el usuario'});
    }
})

//para eliminar la seccion
router.get('/logout', (req, res) => {
    try {
        req.session.destroy(err =>{
            if(err) return res.render('profile', {error: 'No se pudo cerrar sesion'});
            //una vez cerrada la sesion lo redirige a login
            res.redirect('/');
        });
        res.redirect('/login');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



export { router as usersSessionsRouter}