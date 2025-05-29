import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : new InternalServerErrorException().getStatus();

    const message = isHttpException
      ? exception.message
      : 'Internal server error';

    const path = request.url;

    if (
      status === 404 &&
      (path.startsWith('/.well-known/') || path.includes('devtools'))
    ) {
      return;
    }

    this.logger.error(`[${request.method}] ${path}`, {
      status,
      message,
      stack: (exception as any)?.stack,
    });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path,
      message,
    });
  }
}
