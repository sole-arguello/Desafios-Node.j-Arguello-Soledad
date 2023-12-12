import winston from "winston";
import { __dirname } from "../utils.js";
import path from "path";
import { config } from "../config/config.js";

//loger para desarrollo
const devLogger = winston.createLogger({
  //transportes: sistemas de muestra o almacenamiento de logs
  transports: [new winston.transports.Console({ level: "debug" })],
});

//loger para produccion
const prodLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/errors.log"),
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
