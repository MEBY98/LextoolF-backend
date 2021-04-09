import {
    ExecutionContext,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from '@nestjs/common';

/**
*   Guard for controllers (only HTTP requests via REST endpoints,  not graphql)
**/

@Injectable()
export class RestGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
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
