import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DictionarySchema } from './model/dictionary.model';
import { DictionaryService } from './dictionary.service';
import { DictionaryResolver } from './dictionary.resolver';
import { EntryModule } from 'src/entry/entry.module';
import { AuthorModule } from 'src/author/author.module';
import { DictionaryInfoModule } from 'src/dictionaryInfo/dictionaryInfo.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Dictionary', schema: DictionarySchema },
    ]),
    EntryModule,
    DictionaryInfoModule,
  ],
  providers: [DictionaryService, DictionaryResolver],
  exports: [DictionaryService, DictionaryResolver],
})
export class DictionaryModule {}
