import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FraseograficStudyModule } from './fraseograficStudy/fraseograficStudy.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_OPTIONS, MONGO_URL } from '../configuration/mongo.config';
import { MinioModule } from './minIO/minio.module';
import { DescriptorTypeModule } from './descriptorType/descriptorType.module';
import { ObservationModule } from './observation/observation.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URL'),
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
    }),
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    FraseograficStudyModule,
    MinioModule,
    DescriptorTypeModule,
    ObservationModule,
  ],
})
export class AppModule {}
