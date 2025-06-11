import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  GlobalExceptionFilter,
  LoggingInterceptor,
  LoggingService,
} from './common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({ origin: '*', credentials: true });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 4000;

  const loggingService = app.get(LoggingService);

  process.on('uncaughtException', (error: Error) => {
    loggingService.logError('UncaughtException', '/', '-', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any) => {
    loggingService.logError('UnhandledRejection', '/', '-', reason);
  });

  app.useGlobalFilters(new GlobalExceptionFilter(loggingService));

  app.useGlobalInterceptors(new LoggingInterceptor(loggingService));

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidUnknownValues: true }),
  );

  await app.listen(port);

  console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
