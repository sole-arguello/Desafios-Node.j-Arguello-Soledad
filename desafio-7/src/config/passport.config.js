import passport from "passport";
import localStrategy from "passport-local";
import { config } from "./config.js";
import GithubStrategy from "passport-github2";
import { createHash, isValidPassword } from "../utils.js";
import { usersService } from "../dao/index.js";


export const initializePassport = () => {

    //estrategia para registro
    passport.use('registerLocalStrategy', new localStrategy(
        {
            //me permite acceder con los datos del usuario
            passReqToCallback: true,
            usernameField: 'email',//username ahora es igual email
        },
        async(req, username, password, done) =>{

            const {first_name, last_name, age} = req.body
            try {
                const user = await usersService.getUser(username)
                console.log('Usuario local', user)
                
                if(user){//null: que no hubo error, false: ya existe, un mensaje
                    //el usuario ya existe
                    return done(null, false)
                }

                //el usuario no existe, creo el usuario, y al password la hasheo antes de guardarlo
                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email: username,
                    password: createHash(password),
                    role: 'user'
                }
                console.log(newUser)
                //creo un nuevo usuario
                const userCreated = await usersService.createUsers(newUser)
               
                return done(null, userCreated)
            } catch (error) {
                return done(error, {message: 'Error al crear el usuario'})
            }
        }
    
    ))

    //estrategia para login
    passport.use('loginLocalStrategy', new localStrategy(
        {
            usernameField: 'email',//username ahora es igual email
        },
        async (username, password, done) => {
            try {

                const user = await usersService.getUser(username);
                //al revez del registro
                if (!user) {
                //el usuario no esta registrado
                    return done(null, false)//usuario no esta registrado
                }
                if (!isValidPassword(password, user)) {
                    return done(null, false);//{ message: 'Credenciales invalidas' }
                }
                //si todo esta ok(null), creo la session del usuario(user)
                return done(null, user);//pase por la serealizacion
            } catch (error) {
                return done(error);
            }
        }
    ));

    //estrategia para registro con github
    passport.use('registerGithubStrategy', new GithubStrategy(
        {
            clientID: config.github.clientId ,
            clientSecret: config.github.clientSecret,
            callbackURL: `http://localhost:8080/api/sessions${config.github.callbackUrl}`  
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                //console.log('Perfil', profile)
                const user = await usersService.getUser(profile.username)
                if(user){
                    return done(null, user)
                }
                const newUser = {
                    first_name: profile._json.name,
                    last_name: profile.username,
                    age: 0,
                    email: profile._json.email,
                    password: createHash(profile.id),
                    role: 'user'
                }
                
                console.log(newUser)
                const userCreated = await usersService.createUsers(newUser)
                return done(null, userCreated)
            } catch (error) {
                return done(error)
            }
        }
    ))

    //genero la sesion guardando el id, recibo el usuario de userCreated
    passport.serializeUser((user, done)=>{
        done(null, user._id)//id de la base de datos
    })
    //cuando el usuario haga otra peticion(login) se consulta la info, se trae y se guarda en req.user
    passport.deserializeUser(async(id, done)=>{//recibo el id guardado en la sesion
        //verifico si el usuario existe
        const user = await usersService.getUserById(id);
        //const user = await usersModel.findById(id)
        done(null, user)//queda guardado la info del ususario en una variable req.user
    })
}