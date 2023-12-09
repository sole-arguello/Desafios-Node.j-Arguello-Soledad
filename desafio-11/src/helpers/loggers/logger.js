import winston from 'winston';
import { __dirname } from '../../utils.js';
import path from 'path';
import { config } from '../../config/config.js';

const currentEnv = config.server.env

const customLevels ={
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4
    }
}
// //loger para desarrollo
// const devLogger =  winston.createLogger({
//     level:customLevels.levels,
//     //transportes: sistemas de muestra o almacenamiento de logs
//     transports: [
//         new winston.transports.Console({level: 'debug'})
//     ]
// })

// //loger para produccion
// const prodLogger =  winston.createLogger({
//     level:customLevels.levels,
//     transports: [
//         new winston.transports.File({filename: path.join(__dirname, '../logs/prod.log'), level: 'warn'})
//     ]
// })

let logger
if(currentEnv === 'development'){
    winston.createLogger({
        level:customLevels.levels,
        //transportes: sistemas de muestra o almacenamiento de logs
        transports: [
            new winston.transports.Console({level: 'debug'})
        ]
    })
}else if(currentEnv === 'production'){
    winston.createLogger({
        level:customLevels.levels,
        transports: [
            new winston.transports.File({filename: path.join(__dirname, '../logs/prod.log'), level: 'warn'})
        ]
    })
}

export {logger}

