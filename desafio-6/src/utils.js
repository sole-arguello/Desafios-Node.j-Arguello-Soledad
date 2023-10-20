import path from "path";
import { fileURLToPath } from "url";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createHash = (password) => {//recibo la contraseña del form
    const salt = bcrypt.genSaltSync(10);//crea el algoritmo
    const hash = bcrypt.hashSync(password, salt);//recibe la contraseña y el algoritmo
    return hash
    
}

//funcion para comparar los hash
export const inValidPassword = (password, user) => {//recibe la contraseña nueva y los datos del usuario
    return bcrypt.compareSync(password, user.password)
}