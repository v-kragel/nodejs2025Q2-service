import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from '../services';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggingService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const method = request.method;
    const path = request.url;

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : new InternalServerErrorException().getStatus();

    if (
      status === 404 &&
      (path.startsWith('/.well-known/') || path.includes('devtools'))
    ) {
      return;
    }

    const responseBody: { statusCode: number; message: string } = {
      statusCode: status,
      message: 'Internal server error',
    };

    if (isHttpException) {
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        responseBody.message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const { message } = exceptionResponse as any;

        responseBody.message = message ?? 'Unexpected error';
      }
    }

    this.loggerService.logError(method, path, status, responseBody.message);

    response.status(status).json(responseBody);
  }
}
