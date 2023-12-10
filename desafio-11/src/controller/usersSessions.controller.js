import { generateToken } from "../utils.js";
import { logger } from "../helpers/logger.js";

export class UsersSessionsController {
    static renderRegister = async (req, res) => {
        res.render('login', {
            style: "login.css",
            message: `Hola, ${req.user.first_name} te has registrado con exito`
        }, logger.info('Renderizo a login luego de registrar usuario')
        );
    
    }
    static renderRegisterFail = async (req, res) => {
        res.render('register', {
            style: "register.css",
            error: 'Error al registrar el usuario'
        }, logger.error('Fallo al registrar usuario')
        );
    }
    static renderRegisterGithub = async (req, res) => {
        const user = req.user;
        const token = generateToken(user);
        res.cookie('authLogin', token, {maxAge: 43200000, httpOnly: true});
        res.redirect('/profile')
        logger.info('Registro github correcto');
    }
    static renderLogin = async (req, res) => {
        try {
            //manejo de errores en middlewares
            logger.info('loguin rol de usuario: ', req.user.role);
            const user = req.user;
            const token = generateToken(user);
            res.cookie('cookieLogin', token, {maxAge: 43200000, httpOnly: true});
            res.redirect('/');//redirecciono a home y ya tiene acceso a navegar en la page
            logger.info('Login correcto');
        } catch (error) {
            res.render('login', {
                style: "login.css",
                error: 'Credenciales incorrectas'
            });
            logger.error('Credenciales incorrectas');
        }
    }
    static renderLoginFail = async (req, res) => {
        
        res.render('login', {
         style: "login.css",
         error: 'Para navegar debe iniciar sesion'
         }); 
         logger.error('error al iniciar sesion');
     }
     static renderLogout = async (req, res) => {
        try {
            console.log('paso por renderLogout');
            res.clearCookie('cookieLogin');
            //una vez cerrada la sesion lo redirige a login
            res.redirect('/login');
            logger.info('sesion cerrada');
        } catch (error) {
            logger.error('error al cerrar sesion');
            res.status(500).json({ message: error.message });
        }
    }
}