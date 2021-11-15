import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FraseograficStudyModule } from './fraseograficStudy/fraseograficStudy.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MinioModule } from './minIO/minio.module';
import { DescriptorTypeModule } from './descriptorType/descriptorType.module';
import { ObservationModule } from './observation/observation.module';
import { ConfigurationModule } from 'configuration/Configuration.module';
import { ConfigurationService } from 'configuration/Configuration.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (config: ConfigurationService) => ({
        uri: config.getMongoURL(),
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
