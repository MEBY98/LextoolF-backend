import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypegooseModule } from 'nestjs-typegoose';

import { AuthResolver } from '../auth/graphql/auth.resolver';
import { User } from '../user/models/user.model';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwksRsaController } from './jwks-rsa.controller';
import { JwtStrategy } from './jwt.strategy';

const Strategy = {
  defaultStrategy: 'jwt'
}

const JwtOptions = {
  signOptions: {
    expiresIn: 3600,
  },
}

@Module({
  imports: [
    forwardRef(() => UserModule),
    HttpModule,
    JwksRsaController,
    PassportModule.register(Strategy),
    JwtModule.register(JwtOptions),
    TypegooseModule.forFeature([User]),
  ],
  controllers: [
    JwksRsaController
  ],
  providers: [
    JwtStrategy,
    AuthService,
    AuthResolver,
  ],
  exports: [
    JwtModule,
    JwtStrategy,
    PassportModule,
    AuthService
  ],
})
export class AuthModule { }
