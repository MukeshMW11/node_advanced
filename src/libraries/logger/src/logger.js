import winston from "winston";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export const createLogger = (serviceName) => {
  const logDir = path.join(process.cwd(), `src/apps/${serviceName}/logs`);


if(!fs.existsSync(logDir)){


    fs.mkdirSync(logDir,{recursive:true});
};


  const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    defaultMeta: { service: serviceName },
    transports: [
      new winston.transports.File({
        filename: path.join(logDir, "error.log"),
        level: "error",
      }),
      new winston.transports.File({
        filename: path.join(logDir, "combined.log"),
      }),
    ],
  });

  if (process.env.NODE_ENV != "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(
            ({ level, message, timestamp, service }) =>
              `${timestamp} [${service}] ${level}: ${message}`
          )
        ),
      })
    );
  }
  return logger;
};
