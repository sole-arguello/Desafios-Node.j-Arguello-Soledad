import winston from 'winston';
import chalk from 'chalk';
import { __dirname } from '../utils.js';
import path from 'path';
import { config } from '../config/config.js';


const colorizeLevel = winston.format((info) => {
    const { level } = info;
    switch(level){
        case 'info':
            info.level = chalk.yellow(level);
            break;
        case 'warn':
            info.level = chalk.orange(level);
            break;
        case 'debug':
            info.level = chalk.blue(level);
            break
        case 'verbose':
            info.level = chalk.green(level);
            break
        case 'silly':
            info.level = chalk.magenta(level);
            break
        case 'http':
            info.level = chalk.cyan(level);
            break
        case 'error': 
            info.level = chalk.red(level);
        default:
            break
    }
    return info;
})

const loggerDev = winston.createLogger({
    format: winston.format.combine(
        colorizeLevel(),
        winston.format.simple(),
    ),
    transports: [
        new winston.transports.Console({ level: 'debug' }),
    ]
})

const loogerProd = winston.createLogger({
    format: winston.format.combine(
        colorizeLevel(),
        winston.format.simple(),
    ),
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ 
            filename: path.join(__dirname, '/logs/errors.log'),
            level: 'error'
        })
    ]
})

const currentEnv = config.enviroment.persistence
let logger;
if (currentEnv === 'development') {
    logger = loggerDev
} else {
    logger = loogerProd
}

export { logger } 