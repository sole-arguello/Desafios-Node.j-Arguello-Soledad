import { Router } from "express";
import passport from "passport";
import { config } from "../config/config.js";


const router = Router();
/*--------------- esctrategia registro local ---------------*/
//registro al ususario
router.post('/register', passport.authenticate('registerLocalStrategy', 
    {
    failureRedirect: '/api/sessions/fail-register',
    session: false
    }), async (req, res) => {
        res.render('login', {message: `Hola, ${req.user.first_name} te has registrado con exito`});
    
})
router.get('/fail-register', (req, res) => {
    res.render('register', {error: 'Error al registrar el usuario'});
})
/*----------------estrategia registro con github----------------*/
//ruta registro con github
router.get('/register-github', passport.authenticate('registerGithubStrategy'))
//ruta collback con github
router.get(config.github.callbackUrl, passport.authenticate('registerGithubStrategy', 
{failureRedirect: '/api/sessions/fail-register'}), (req, res) => {
    res.redirect('/profile')
})
/*---------------- estrategia login ------------*/

//logueo al usuario se admin o usuario locales
router.post('/login', passport.authenticate('loginLocalStrategy',
    {
        failureRedirect: '/api/sessions/fail-login',
        session: false
    }), async (req, res) => {

    res.redirect('/');//redirecciono a home y ya tiene acceso a navegar en la page
        
})
router.get('/fail-login', (req, res) => {
   res.render('login', {error: 'Credenciales Invalidas'}); 
})

/*--------------------------------------------------- */

//para eliminar la seccion
router.get('/logout', (req, res) => {
    try {
        res.clearCookie('authLogin');
        //una vez cerrada la sesion lo redirige a login que inicia en home
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



export { router as usersSessionsRouter}