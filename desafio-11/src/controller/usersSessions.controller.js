import { generateToken } from "../utils.js";
import { logger } from "../helpers/logger.js";
import { error } from "console";

export class UsersSessionsController {
    static renderRegister = async (req, res) => {
        res.render('login', {
            style: "login.css",
            message: `Hola, ${req.user.first_name} te has registrado con exito`
        });
    
    }
    static renderRegisterFail = async (req, res) => {
        res.render('register', {
            style: "register.css",
            error: 'Error al registrar el usuario'
        });
        logger.error(error.message);
    }
    static renderRegisterGithub = async (req, res) => {
        const user = req.user;
        const token = generateToken(user);
        res.cookie('authLogin', token, {maxAge: 43200000, httpOnly: true});
        res.redirect('/profile')
        
    }
    static renderLogin = async (req, res) => {
        try {
            //manejo de errores en middlewares
            
            const user = req.user;
            const token = generateToken(user);
            res.cookie('cookieLogin', token, {maxAge: 43200000, httpOnly: true});
            res.redirect('/');//redirecciono a home y ya tiene acceso a navegar en la page
            logger.info('login exitoso');
        } catch (error) {

            res.render('login', {
                style: "login.css",
                error: 'Credenciales incorrectas'
            });
            logger.error(error.message);
            
        }
    }
    static renderLoginFail = async (req, res) => {
        res.render('login', {
         style: "login.css",
         error: 'Para navegar debe iniciar sesion'
         }); 
         logger.error(error.message);
         
     }
     static renderLogout = async (req, res) => {
        try {
            res.clearCookie('cookieLogin');
            //una vez cerrada la sesion lo redirige a login
            res.redirect('/login');
            
        } catch (error) {
            logger.error(error.message);
            res.status(500).json({ message: error.message });
        }
    }
}