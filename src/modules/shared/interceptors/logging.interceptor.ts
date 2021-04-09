import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

/* 
  This interceptor log in console all requests made to the server,the operation name, 
  the operation type (Mutation | Query | Subscription), and the user involved
*/

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let contextType: string = context.getType()

    if (contextType == 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      if (ctx && ctx.getContext()) {
        const user = ctx.getContext().user;
        const info = ctx.getInfo();
        const { fieldName, parentType } = info;
        const operation = info.operation.operation;

        let aux = '';

        if (user) {
          const { _id, name } = user;
          aux = `User with name: ${name} and id: "${_id}", request the following operation: \n`;
        }

        Logger.debug(
          `${aux} Parent:"${parentType}" Operation: "${fieldName}", Operation Type: "${operation}"`,
          context.getClass().name,
        );
      }
    }

    return next.handle();
  }
}
