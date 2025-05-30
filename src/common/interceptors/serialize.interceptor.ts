import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) =>
            plainToInstance(this.dto, item, { excludeExtraneousValues: true }),
          );
        }
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
