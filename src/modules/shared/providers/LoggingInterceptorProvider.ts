import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';

export const LOG_PROVIDER = [
    {
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
    },
];
