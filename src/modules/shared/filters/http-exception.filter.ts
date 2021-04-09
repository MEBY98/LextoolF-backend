import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Request, Response } from 'express';

/* 
  This filter capture all Http Exceptions (no matter what type is) and return an
  appropiated network response 
*/

@Catch(HttpException)
export class HttpGqlExceptionFilter<T> implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const errorMessage = exception.message;

    Logger.error(errorMessage, 'ExceptionFilter ');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // If is REST request return as response status frinedly object
    if (response.status !== undefined) {
      const request = ctx.getRequest<Request>();

      response
        .status(status)
        .send({
          errorMessage,
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
    }

    // If is GraphQl Request return as Error object
    throw new HttpException(exception.message, status)
  }
}
