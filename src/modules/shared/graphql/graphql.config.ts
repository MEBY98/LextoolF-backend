import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { isJWT } from 'class-validator';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

import { AuthService } from '../../auth/auth.service';
import { UserService } from './../../user/user.service';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  async validateToken(authToken): Promise<string> {
    if (isJWT(authToken)) {
      throw new NotFoundException('Invalid token');
    }

    try {
      // TODO:
      const keyid = crypto.createHash('sha256').update(this.authService.PublicKey).digest('hex');
      const verify = await jwt.verify(authToken, this.authService.PrivateKey, { algorithms: ['RS256'] })

      if (verify['sub'])
        return verify['sub']
      else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      Logger.error(error);
      throw new Error('Invalid token');
    }
  }

  /**
  *   Hook when user connect from webSocket client
  *   Check if connectionParams have a valid token (sended from client)
  **/
  onConnect = async (connectionParams: any, webSocket) => {
    if (connectionParams.authToken) {
      try {
        const email = await this.validateToken(connectionParams.authToken);
        if (email) {
          const user = await this.userService.getOne({ email });
          return {
            user
          };
        }
        throw new Error('Invalid auth token!');
      }
      catch (e) {
        Logger.error(e, 'Failed validation of auth token on connection to websocket')
      }
    } else {
      throw new Error('Missing auth token!');
    }
  };

  /**
  *   Context basically returns the variables and headers accesibles in resolvers functions,
  *   also are accessible in Guards Interceptors etc..
  **/
  context = ({ req, res, connection, payload }) => {
    if (req) {
      // Here is a HTTP request
      return { headers: req.headers };
    } else if (connection) {
      // Here is a WebSocket connection
      return { user: connection.context.user };
    }
  };

  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {

    return {
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        path: '/subscriptions',
        // keepAlive: 100000,
        onConnect: this.onConnect,
      },
      resolvers: {},
      context: this.context,
      // typePaths: ['./**/*.gql'],
      installSubscriptionHandlers: true,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
      buildSchemaOptions: {
        numberScalarMode: "integer",
        scalarsMap: [
        ]
      }
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.schema.ts'),
      //   outputAs: 'class',
      // },
    };
  }
}
