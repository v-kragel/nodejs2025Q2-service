import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { ClassConstructor } from 'class-transformer';

export function Serialize<T>(dto: ClassConstructor<T>) {
  return applyDecorators(UseInterceptors(new SerializeInterceptor(dto)));
}
