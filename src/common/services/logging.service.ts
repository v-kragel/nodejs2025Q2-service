import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger('LoggerService');

  logRequest(method: string, url: string, query: any, body: any) {
    this.logger.log(
      `Request: ${method} ${url} | Query: ${JSON.stringify(query)} | Body: ${JSON.stringify(body)}`,
    );
  }

  logResponse(method: string, url: string, statusCode: number, response: any) {
    this.logger.log(
      `Response: ${method} ${url} | Status: ${statusCode} | Response: ${JSON.stringify(response)}`,
    );
  }

  logError(method: string, url: string, statusCode: any, error: any) {
    this.logger.error(
      `${method} ${url} | Status: ${statusCode} | Error: ${error}`,
    );
  }
}
