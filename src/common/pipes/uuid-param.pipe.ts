import { ParseUUIDPipe } from '@nestjs/common';

export const UuidParamPipe = new ParseUUIDPipe({
  version: '4',
  errorHttpStatusCode: 400,
});
