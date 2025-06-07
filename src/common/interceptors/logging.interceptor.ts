import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from '../services';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, originalUrl, query, body } = req;

    this.loggingService.logRequest(method, originalUrl, query, body);

    const res = context.switchToHttp().getResponse();
    const { statusCode } = res;

    return next.handle().pipe(
      tap((responseData) => {
        this.loggingService.logResponse(
          method,
          originalUrl,
          statusCode,
          responseData,
        );
      }),
    );
  }
}
