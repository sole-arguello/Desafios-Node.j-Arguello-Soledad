import { Router } from "express";
import passport from "passport";
import { config } from "../config/config.js";


const router = Router();

//registro al ususario
router.post('/register', passport.authenticate('registerLocalStrategy', {
    failureRedirect: '/api/sessions/fail-register'}), async (req, res) => {
        res.render('login', {message: 'Usuario registrado con exito'});
    
})
router.get('/fail-register', (req, res) => {
    res.render('register', {error: 'No se pudo registrar el usuario'});
})
/*----------------estrategia github----------------*/
//ruta registro con github
router.get('/register-github', passport.authenticate('registerGithubStrategy'))
//ruta collback con github
router.get(config.github.callbackUrl, passport.authenticate('registerGithubStrategy', 
{failureRedirect: '/api/sessions/fail-register'}), (req, res) => {
    res.redirect('/profile')
})
/*---------------------------------------------------*/

//logueo al usuario se admin o usuario
router.post('/login', passport.authenticate('loginLocalStrategy',
{failureRedirect: '/api/sessions/fail-login'}), async (req, res) => {

    res.redirect('/');//redirecciono a home y ya tiene acceso a navegar en la page
        
})
router.get('/fail-login', (req, res) => {
   res.render('login', {error: 'No se pudo iniciar sesion, para este usuario'}); 
})

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