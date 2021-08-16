import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DictionaryType, NewDictionaryType } from './type/dictionary.types';
import { DictionaryService } from './dictionary.service';
import { EntryType, NewEntryType } from 'src/entry/type/entry.type';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Resolver()
export class DictionaryResolver {
  constructor(private readonly DictionaryService: DictionaryService) {}

  @Query(() => [DictionaryType])
  async getAllDictionaries() {
    return await this.DictionaryService.findAll();
  }

  @Query(() => DictionaryType)
  async getDictionaryByID(@Args('dictionaryID') dictionaryID: string) {
    return await this.DictionaryService.findByID(dictionaryID);
  }

  @Mutation(() => EntryType)
  async createEntryByDictionaryID(
    @Args('newEntry') newEntry: NewEntryType,
    @Args('dictionaryID') dictionaryID: string,
  ) {
    return this.DictionaryService.createEntryByDictionaryID(
      newEntry,
      dictionaryID,
    );
  }

  @Mutation(returns => Boolean)
  async deleteEntryByDictionaryID(
    @Args('entryID') entryID: string,
    @Args('dictionaryID') dictionaryID: string,
  ) {
    return await this.DictionaryService.deleteEntryByDictionaryID(
      dictionaryID,
      entryID,
    );
  }
}
