import { generateToken, isValidPassword } from "../utils.js";
import { logger } from "../helpers/logger.js";
import { generateEmailToken, sendChangePasswordEmail, verifyEmailToken } from "../helpers/email.js";
import { usersSessionsService } from "../repositories/index.js";
import { createHash } from "crypto";


export class UsersSessionsController {
    static renderRegister = async (req, res) => {
        logger.info('Renderizo a login luego de registrar usuario')
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
        logger.error('Error al registrar el usuario');
    }
    static renderRegisterGithub = async (req, res) => {
        const user = req.user;
        const token = generateToken(user);
        logger.info('Registro github correcto');
        res.cookie('authLogin', token, {maxAge: 43200000, httpOnly: true});
        res.redirect('/profile')
        
    }
    static renderLogin = async (req, res) => {
        try {
            //manejo de errores en middlewares
            const user = req.user;
            const token = generateToken(user);
            logger.info('Login correcto - ', {message: user.role});
            res.cookie('cookieLogin', token, {maxAge: 43200000, httpOnly: true});
            res.redirect('/');//redirecciono a home y ya tiene acceso a navegar en la page
            
        } catch (error) {
            logger.error(error.message);
            res.render('login', {
                style: "login.css",
                error: 'Credenciales incorrectas'
            });
            
        }
    }
    static renderLoginFail = async (req, res) => {
        logger.error('error al iniciar sesion');
        res.render('login', {
         style: "login.css",
         error: 'Para navegar debe iniciar sesion'
         }); 
         
     }
     static renderLogout = async (req, res) => {
        try {
            logger.info('sesion cerrada');
            res.clearCookie('cookieLogin');
            //una vez cerrada la sesion lo redirige a login
            res.redirect('/login');
           
        } catch (error) {
            logger.error(error.message);
            res.status(500).json({ message: error.message });
        }
    }

    static forgotPassword = async (req, res) => {
        const {email} = req.body;
        //console.log(email)
        try {
 
            //verifico si existe traigo el email del repository
            const user = await usersSessionsService.getUserByEmail(email);
            //console.log(user)
            const emailToken = generateEmailToken(email, 5*60)
            await sendChangePasswordEmail(req, email, emailToken);
            res.send(`Revisa tu correo para restablecer tu contraseña <a href="/">Volver al login</a>`);
        } catch (error) {
            logger.error(error.message);
            res.status(500).json({ message: error.message });
        }
        
    }

    static resetPassword = async (req, res) => {
        try {
           const token = req.query.token;
           const { newPassword } = req.body;
           //validar el token sea valido
           const validemail = verifyEmailToken(token);
           if(!validemail){
              return res.send(`El enlace ya no es valido, genera un nuevo enlace 
              <a href="/forgot-password">Enlace</a>`)
           }
           const user = await usersSessionsService.getUserByEmail(validemail);
           if(!user){
            return res.send('Esta operacion no se puede realizar')
           }
           //actualizo el password
           const updatePassword = await usersSessionsService.updatePassword(validemail, newPassword);
           //comparo las contrase;as
           if(isValidPassword(newPassword, user)){
             return res.render('resetPassview', {error: 'credendiales invalidas', token})
           }
           const userData = {
               ...user,
               password: createHash(newPassword)

           }
           //actualizo
           await usersSessionsService.updateUser(user._id, userData);
           res.render('login', {message: 'Contraseña actualizada con exito'})

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}