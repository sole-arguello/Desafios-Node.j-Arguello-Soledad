import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import { transporter } from "../config/gmailMailling.js";

export const generateEmailToken = (email, expireTime) => {
    const token = jwt.sign({email}, config.gmail.secretToken, { expiresIn: expireTime} )
    return token
}

export const sendChangePasswordEmail = async(req, userEmail, token)=>{
    const domain = `${req.protocol}://${req.get('host')}`;
    const link = `http://localhost:8080/reset-password?token=${token}`//enlace con el token

    //envio correo con enlace
    await transporter.sendMail({
        from: 'Ecommerce',
        to: userEmail,
        subject: 'Restablecer de contraseña',
        html: `<div>
            <h2>Hola</h2>
            <p >Solicitaste Restablecer tu contraseña</p>
            <a href="${link}">
            <button>Restablecer Contraseña</button>
            </a>
        </div>`
    })
}

export const verifyEmailToken = (token)=>{
    try {
        const infoToken = jwt.verify(token, config.gmail.secretToken)
        return infoToken.email
    } catch (error) {
        console.log(error.message)
        return null
        
    }
}