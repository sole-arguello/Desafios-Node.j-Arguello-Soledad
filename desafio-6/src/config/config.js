import dotenv from 'dotenv';
dotenv.config()

export const config = {
    mongo:{
        url: process.env.MONGO_URL
    },
    server: {
        secretSession: process.env.SECRET_SESSION
    },
}