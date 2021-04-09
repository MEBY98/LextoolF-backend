import { ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

/**
*   Guard for resolvers of Graphql
**/

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext();
    const { headers } = req

    if (headers?.authorization || headers?.Authorization) {
      return super.canActivate(new ExecutionContextHost([req]));
    }

    throw new NotFoundException();
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new NotFoundException();
    }
    return user;
  }
}
