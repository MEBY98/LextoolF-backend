import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { UserResolver } from './graphql/user.resolver';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    TypegooseModule.forFeature([User])
  ],
  providers: [
    UserService,
    UserResolver,
  ],
  exports: [
    UserService,
  ]
})
export class UserModule { }
