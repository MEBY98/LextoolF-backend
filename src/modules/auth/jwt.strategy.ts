import {
  Injectable,
  UnauthorizedException,
  Logger,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SigningKey } from 'jwks-rsa';
import jwksRsa from 'jwks-rsa';
import jwtDecode from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(JwtStrategy.name);

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      /**
      *   secretOrKeyProvider is a way to dynamicaly change the secret key to generate auth tokens.
      *   Below is an implementation with jwkRsa 
      **/
      secretOrKeyProvider: (request, jwt, result) => {
        // TODO: move URL to a better location
        const client = jwksRsa({
          rateLimit: true,
          requestHeaders: {},
          strictSsl: false,
          jwksUri: 'http://localhost:5000/.well-known/jwks.object',
          cache: true,
          jwksRequestsPerMinute: 2,
        });

        try {
          const kid = jwtDecode(jwt, { header: true })['kid'];

          client.getSigningKey(kid, (err, key: SigningKey) => {
            if (err) {
              this.logger.log('Error happened in getSigningKey, could not find the public key');
              return result(null, null);
            }

            result(null, key['rsaPublicKey'] || key['publicKey'] || key.getPublicKey());
          });
        } catch (err) {
          throw new NotFoundException()
        }
      },
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }


  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
