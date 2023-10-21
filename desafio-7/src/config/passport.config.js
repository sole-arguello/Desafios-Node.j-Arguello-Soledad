import passport from "passport";
import localStrategy from "passport-local";
import { createHash, isValidPassword } from "../utils.js";

import { usersService } from "../dao/index.js";


export const initializePassport = () => {

    //estrategia para registro
    passport.use('registerLocalStrategy', new localStrategy(
        {
            //me permite trabajar con los datos del usuario
            passReqToCallback: true,
            usernameField: 'email',//username ahora es igual email
        },
        async(req, username, password, done) =>{

            const {first_name} = req.body
            try {
                const user = await usersService.getUser(username)
                //const user = await usersModel.findOne({email: username})
                if(user){//null: que no hubo error, false: ya existe, un mensaje
                    //el usuario ya existe
                    return done(null, false, {message: 'El usuario ya esta registrado'})
                }

                //el usuario no existe, creo el usuario, y al password la hasheo antes de guardarlo
                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email: username,
                    password: createHash(password),
                    role: 'usuario'
                }
                console.log(newUser)
                //creo un nuevo usuario
                const userCreated = await usersService.createUsers(newUser)
                //const userCreated = await usersModel.create(newUser)
                return done(null, userCreated, {message: 'Usuario creado con exito'})
            } catch (error) {
                return done(error, {message: 'Error al crear el usuario'})
            }
        }
    
    ))


    // //estrategia para login
    // passport.use('loginLocalStrategy', new localStrategy(
    //     {
    //         usernameField: 'email',
    //     },
    //     async (username, password, done) => {
    //         try {

    //             const loginUser = req.body
    //             if(loginUser.email === 'admin@coder.com' && loginUser.password === 'admin') {
    //                 req.session.email = loginUser.email
    //                 req.session.role = 'admin'
    //             }else{
    //                 const user = await usersService.getUser(username);
    //                 //const user = await usersModel.findOne({ email: username });
    //                 //al revez del registro
    //                 if (!user) {
    //                     return done(null, false, {message: 'El usuario no esta registrado'})//usuario no esta registrado
    //                 }
    //                 if (!isValidPassword(password, user)) {
    //                     return done(null, false);//{ message: 'Credenciales invalidas' }
    //                 }
    //             }

    //             //si todo esta ok(null), creo la session del usuario(user)
    //             return done(null, user);
    //         } catch (error) {
    //             return done(error);
    //         }
    //     }
    // ));

    //genero la sesion guardando el id
    passport.serializeUser((user, done)=>{
        done(null, user._id)//id de la base de datos
    })
    //cuando el usuario haga otra peticion(login) se consulta la info, se trae y se guarda en req.user
    passport.deserializeUser(async(id, done)=>{
        const user = await usersService.getUserById(id);
        //const user = await usersModel.findById(id)
        done(null, user)//queda guardado la info del ususario en una variable req.user
    })
}