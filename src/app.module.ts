import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FraseograficStudyModule } from './fraseograficStudy/fraseograficStudy.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_OPTIONS, MONGO_URL } from '../configuration/mongo.config';
import { MinioModule } from './minIO/minio.module';
import { ClasificationModule } from './clasification/clasification.module';
import { DescriptorTypeModule } from './descriptorType/descriptorType.module';
import { ObservationModule } from './observation/observation.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL, MONGO_OPTIONS),
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    FraseograficStudyModule,
    MinioModule,
    DescriptorTypeModule,
    ObservationModule,
  ],
})
export class AppModule {}
