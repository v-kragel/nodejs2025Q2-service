import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService {
  private readonly logger: winston.Logger;

  constructor() {
    const logDir = process.env.LOG_DIR || 'logs';

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    const maxSize = parseInt(process.env.LOG_FILE_MAX_SIZE || '5242880', 10);
    const maxFiles = parseInt(process.env.LOG_FILE_MAX_FILES || '5', 10);

    this.logger = winston.createLogger({
      level: 'debug',
      format: winston.format.combine(
        winston.format.printf(
          ({ level, message }) => `[${level.toUpperCase()}] ${message}`,
        ),
      ),
      transports: [
        new winston.transports.File({
          filename: path.join(logDir, 'error.log'),
          level: 'error',
          maxsize: maxSize,
          maxFiles,
        }),
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    });
  }

  logRequest(method: string, url: string, query: any, body: any) {
    this.logger.info(`${method} ${url}`);
    this.logger.info(`Query: ${JSON.stringify(query)}`);
    this.logger.info(`Body: ${JSON.stringify(body)}`);
  }

  logResponse(method: string, url: string, statusCode: number, response: any) {
    this.logger.info(`${method} ${url} [${statusCode}]`);
    this.logger.info(`Response: ${JSON.stringify(response)}`);
  }

  logError(method: string, url: string, statusCode: any, error: any) {
    this.logger.error(`${method} ${url}`);
    this.logger.error(`Status: ${statusCode}`);
    this.logger.error(`Error: ${error}`);
  }
}
