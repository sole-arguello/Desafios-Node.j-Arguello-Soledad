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
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debbug: 'blue'

    }
}

winston.addColors(customLevels.colors)
//loger para desarrollo
const devLoger =  winston.createLogger({
    levels: customLevels.levels,
    //transportes: sistemas de muestra o almacenamiento de logs
    transports: [
        new winston.transports.Console({level: 'debbug'})
    ]
})

//loger para produccion
const prodLoger =  winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.File({filename: path.join(__dirname, '../logs/prod.log'), level: 'warn'})
    ]
})

let logger
if(currentEnv === 'development'){
    logger = devLoger
}else if(currentEnv === 'production'){
    logger = prodLoger
}

export {logger}

