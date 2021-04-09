import { createParamDecorator, Logger, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 *  @Decorator
 *   Get the user from context in graphql resolvers
 *  
 *   --> IMPORTANT <--
 *   The user is in context only when the process of extract JWT from Headers as Bearer token return 
 *   a valid username, therefore a valid user should be returned by 'validateUser' method in AuthService
 *  
 **/

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  return GqlExecutionContext.create(ctx).getContext().user;
});


/**
 *  @Decorator
 *   Get the user from context in REST controlers
 **/
export const GetUserRest = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user
  }
);
