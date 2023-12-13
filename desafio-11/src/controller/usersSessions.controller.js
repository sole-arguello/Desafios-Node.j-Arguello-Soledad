import { generateToken } from "../utils.js";
import { logger } from "../helpers/logger.js";

export class UsersSessionsController {
    static renderRegister = async (req, res) => {
        //logger.info('Renderizo a login luego de registrar usuario')
        res.render('login', {
            style: "login.css",
            message: `Hola, ${req.user.first_name} te has registrado con exito`
        });
    
    }
    static renderRegisterFail = async (req, res) => {
        //logger.error('Fallo al registrar usuario')
        res.render('register', {
            style: "register.css",
            error: 'Error al registrar el usuario'
        });
    }
    static renderRegisterGithub = async (req, res) => {
        const user = req.user;
        const token = generateToken(user);
        //logger.info('Registro github correcto');
        res.cookie('authLogin', token, {maxAge: 43200000, httpOnly: true});
        res.redirect('/profile')
        
    }
    static renderLogin = async (req, res) => {
        try {
            //manejo de errores en middlewares
            //logger.info('loguin rol de usuario: ', req.user.role);
            const user = req.user;
            const token = generateToken(user);
            //logger.info('Login correcto');
            res.cookie('cookieLogin', token, {maxAge: 43200000, httpOnly: true});
            res.redirect('/');//redirecciono a home y ya tiene acceso a navegar en la page
            
        } catch (error) {
            //logger.error('Credenciales incorrectas');
            res.render('login', {
                style: "login.css",
                error: 'Credenciales incorrectas'
            });
            
        }
    }
    static renderLoginFail = async (req, res) => {
        //logger.error('error al iniciar sesion');
        res.render('login', {
         style: "login.css",
         error: 'Para navegar debe iniciar sesion'
         }); 
         
     }
     static renderLogout = async (req, res) => {
        try {
            //logger.info('sesion cerrada');
            res.clearCookie('cookieLogin');
            //una vez cerrada la sesion lo redirige a login
            res.redirect('/login');
            
        } catch (error) {
            //logger.error('error al cerrar sesion');
            res.status(500).json({ message: error.message });
        }
    }
}