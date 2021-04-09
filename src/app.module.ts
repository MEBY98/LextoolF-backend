import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';

import { MONGO_OPTIONS, MONGO_URL } from './appConfig/mongo.config';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { DictionaryModule } from './modules/business-modules/dictionary/dictionary.module';
import { ConfigModule } from './modules/shared/config/config.module';
import { GraphqlOptions } from './modules/shared/graphql/graphql.config';
import { APP_PROVIDERS } from './modules/shared/providers/ApplicationProviders';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';

@Module({
  imports: [
    ConfigModule,
    DictionaryModule,
    AuthModule,
    TypegooseModule.forRoot(MONGO_URL, MONGO_OPTIONS),
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
      imports: [
        UserModule,
        AuthModule,
      ],
      inject: [
        UserService,
        AuthService,
      ]
    }),
  ],
  controllers: [],
  providers: [
    ...APP_PROVIDERS
  ]
})
export class AppModule { }
