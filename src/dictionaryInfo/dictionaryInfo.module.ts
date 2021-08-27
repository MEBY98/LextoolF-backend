import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DictionaryInfoSchema } from './model/dictionaryInfo.model';
import { DictionaryInfoResolver } from './dictionaryInfo.resolver';
import { DictionaryInfoService } from './dictionaryInfo.service';
import { AuthorModule } from 'src/author/author.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DictionaryInfo', schema: DictionaryInfoSchema },
    ]),
    AuthorModule,
  ],
  providers: [DictionaryInfoService, DictionaryInfoResolver],
  exports: [DictionaryInfoService, DictionaryInfoResolver],
})
export class DictionaryInfoModule {}
