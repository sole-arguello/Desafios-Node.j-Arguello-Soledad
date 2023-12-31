import winston from "winston";

import { __dirname } from "../utils.js";
import path from "path";
import { config } from "../config/config.js";
import chalk from "chalk";

const colorizeLevel = winston.format((info) => {
  const { level } = info;

  switch(level){
    case 'info':
      info.level = chalk.yellow(level);
      break;
    case 'warn':
      info.level = chalk.cyan(level);
      break;
    
    case 'error':
      info.level = chalk.red(level);
      break;
    
    default:
      break
  }
  return info
})

//loger para desarrollo
const devLogger = winston.createLogger({
  format: winston.format.combine(
    colorizeLevel(),
    winston.format.simple(),
  ),
  //transportes: sistemas de muestra o almacenamiento de logs
  transports: [new winston.transports.Console({ level: "debug" })],
});

//loger para produccion
const prodLogger = winston.createLogger({
  format: winston.format.combine(
    colorizeLevel(),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: path.join(__dirname, "/logs/errors.log"),
      level: "error",
    }),
  ],
});
const currentEnv = config.enviroment.persistence;
let logger;
if (currentEnv === "development") {
  logger = devLogger;
} else if (currentEnv === "production") {
  logger = prodLogger;
}

export { logger };
