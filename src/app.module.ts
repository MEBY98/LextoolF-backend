import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProjectModule } from './project/project.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DescriptorModule } from './descriptor/descriptor.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/Dictionary'),
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    ProjectModule,
    DescriptorModule
  ],  
})
export class AppModule { }
