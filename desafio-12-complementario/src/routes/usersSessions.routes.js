import { Router } from "express";
import { config } from "../config/config.js";
import { 
    customRegister,
    registerLocalStrategy, registerGithubStrategy, 
    registerGithubStrategyFail, loginLocalStrategy } from "../middlewares/auth.js";
import { UsersSessionsController } from "../controller/usersSessions.controller.js";
import { transporter } from "../config/gmailMailling.js";

const router = Router();
/*--------------- esctrategia registro local ---------------*/
//registro al ususario
router.post('/register',customRegister, registerLocalStrategy, UsersSessionsController.renderRegister )

router.get('/fail-register', UsersSessionsController.renderRegisterFail)
/*----------------estrategia registro con github----------------*/
//ruta registro con github
router.get('/register-github', registerGithubStrategy)
//ruta collback con github
router.get(config.github.callbackUrl, registerGithubStrategyFail, UsersSessionsController.renderRegisterGithub)
/*---------------- estrategia login ------------*/

//logueo al usuario se admin o usuario locales//localhost:8080/api/sessions/login
router.post('/login', loginLocalStrategy, UsersSessionsController.renderLogin)
router.get('/fail-login', UsersSessionsController.renderLoginFail)

/*--------------------------------------------------- */

//para eliminar la seccion
router.get('/logout', UsersSessionsController.renderLogout)

// const eamilTemplate = `<div>
//     <h1>Bienvenido!!</h1>
//     <img src="" style= "width: 100px;">
//     <p>Ya puedes comenzar a usar nuestros servicios</p>
//     <a href="https://localhost:8080">Ahora inicia sesion</a>
// </div>`

//ruta para email localhost:8080/api/sessions/send-email
// router.post('send-email', async (req, res) => {
//     try {
//         const result = await transporter.sendMail({
//             from: config.gmail.account,
//             to: 'soledad.ar1@gmail.com',
//             subject: 'Tu registro a sido exitoso',
//             html: eamilTemplate
//         })
//         console.log(result)
//         res.json({ status: "ok", message: 'Email enviado' })
//     } catch (error) {
//         console.log(error)
//         res.json({ status: "error", message: 'Hubo un error al enviar el email' })
//     }
// })

export { router as usersSessionsRouter}