import { APP_FILTER } from '@nestjs/core';

import { HttpGqlExceptionFilter } from '../filters/http-exception.filter';
import { LOG_PROVIDER } from './LoggingInterceptorProvider';

export const APP_PROVIDERS = [
  {
    provide: APP_FILTER,
    useClass: HttpGqlExceptionFilter,
  },
  ...LOG_PROVIDER
];
