import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FraseograficStudyModule } from './fraseograficStudy/fraseograficStudy.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DescriptorModule } from './descriptor/descriptor.module';
import { EntryModule } from './entry/entry.module';
import { DictionaryModule } from './dictionary/dictionary.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/Dictionary', {
      useFindAndModify: false,
    }),
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    FraseograficStudyModule,
  ],
})
export class AppModule {}
