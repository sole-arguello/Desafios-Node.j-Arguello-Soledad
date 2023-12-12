import passport from "passport";
import { generateUserErrorInfo } from "../service/errors/infoDictionary.js";
import { CustomError } from '../service/errors/customErrors.js'
import { EError } from "../service/errors/enums.js";
import { logger } from "../helpers/logger.js";
//------------Roles
export const  authorization = (roles) => {

    return (req, res, next) => {
        console.log("Tipo de Usuario logueado", req.user.role)
        if (!roles.includes(req.user.role)) {
            res.json({status: 'error', message: 'No autorizado para realizar esta accion'})
        }else{
            next();
        }
        
    }
}

//--------------- passport
export const customRegister = (res, req, next) => {
    try {
        const {firts_name, last_name, email, password} = req.body
        if(!firts_name || !last_name || !email || !password){
            CustomError.createError({
                name: "Error al crear el usuario",
                cause: generateUserErrorInfo(req.body),
                message: "Campos incompletos",
                code: EError.INVALID_LOGIN
            })
        }else{
            logger.error("error al registrar el usuario")
            next()
        }
    } catch (error) {
        logger.error("error al registrar el usuario", error)
        next(error)
    }

}
export const registerLocalStrategy = passport.authenticate(
    'registerLocalStrategy', 
    {
    failureRedirect: '/api/sessions/fail-register',
    session: false
    })



export const registerGithubStrategy = passport.authenticate('registerGithubStrategy')

export const registerGithubStrategyFail = passport.authenticate(
    'registerGithubStrategy', 
    {
        failureRedirect: '/api/sessions/fail-register',
        session: false
    })

export const loginLocalStrategy =  passport.authenticate('loginLocalStrategy',
    {
        failureRedirect: '/api/sessions/fail-login',
        session: false
    })

export const jwtAuth = passport.authenticate('jwtAuth', 
    {
        failureRedirect: '/api/sessions/fail-login', session: false
    })