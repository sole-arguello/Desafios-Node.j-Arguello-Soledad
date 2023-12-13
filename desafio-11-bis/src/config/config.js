import dotenv from 'dotenv';
import { Command } from 'commander'; 

dotenv.config()
const program = new Command();

program
    .option('--port <port>', 'Puersto de ejecucion', '3000')
    .option('--mode <mode>', 'Entorno de desarrollo', 'development')
    .parse()

const persistenceMode = program.opts().mode
const port = program.opts().port

export const config = {

    server: {
        port: port,
    },

    tokenJWT: {
      tokenJWT_Key: process.env.PRIVATE_KEY,  
    },
    
    mongo: {
        url: process.env.MONGO_URL
    },
    
    github: {
        callbackUrl: process.env.GITHUB_CALLBACK_URL,
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },

    enviroment: {
        persistence: persistenceMode
    }
}
