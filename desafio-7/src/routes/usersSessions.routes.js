import { Router } from "express";
import { usersService } from "../dao/index.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

//registro al ususario
router.post('/register', passport.authenticate('registerLocalStrategy', {
    failureRedirect: '/api/sessions/fail-register'}), async (req, res) => {
        res.render('login', {message: 'Usuario registrado con exito'});
    
})
router.get('/fail-register', (req, res) => {
    res.render('register', {error: 'No se pudo registrar el usuario'});
})

//logueo al usuario se admin o usuario
// router.post('/login',
// passport.authenticate('loginLocalStrategy',
// {failureRedirect: '/api/sessions/fail-login'}), async (req, res) => {
//     try {
//         //recibo el cuerpo del form
//         const loginUser = req.body;
//         const passwordLogin = loginUser.password
//         if(loginUser.email === 'admin@coder.com' && loginUser.password === 'admin') {
//             req.session.email = loginUser.email
//             req.session.role = 'admin'
//         }else{
//             const user = await usersService.getUser(loginUser.email);
//             //verifico si el usuario existe
//             if(!user) {
//                 return res.render('login', {error: 'Usuario no registrado'});
//             }
//            //remplazo validacion de contraseña
//             if(!isValidPassword(passwordLogin, user)) {

//                 return res.render('login', {error: 'Credenciles invalidas'});
//             }
//             //si todo es ok, creo la sesion del usuario 
//             req.session.first_name = user.first_name;
//             req.session.last_name = user.last_name;
//             req.session.age = user.age;
//             req.session.email = user.email;
//             req.session.role = user.role;
            
//         }

//         res.redirect('/');//redirecciono a home y ya tiene acceso a navegar en la page     
//     } catch (error) {
//         res.status(500).render('login', {error: 'No se pudo iniciar sesion, para este usuario'});
//     }

// })
// router.get('/fail-login', (req, res) => {
    
// })

//para eliminar la seccion
router.get('/logout', (req, res) => {
    try {
        req.session.destroy(err =>{
            if(err) return res.render('profile', {error: 'No se pudo cerrar sesion'});
            //una vez cerrada la sesion lo redirige a login que inicia en home
            res.redirect('/');
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



export { router as usersSessionsRouter}