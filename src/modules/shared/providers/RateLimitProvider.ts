import { APP_INTERCEPTOR } from '@nestjs/core';
import { RateLimiterInterceptor } from 'nestjs-rate-limiter';

export const RATE_LIMIT_PROVIDER = [{
    provide: APP_INTERCEPTOR,
    useClass: RateLimiterInterceptor,
}]
