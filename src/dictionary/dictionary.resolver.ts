import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  DictionaryType,
  CreatedDictionaryType,
  NewDictionaryType,
} from './type/dictionary.types';
import { DictionaryService } from './dictionary.service';
import { EntryType, NewEntryType } from 'src/entry/type/entry.type';

@Resolver()
export class DictionaryResolver {
  constructor(private readonly DictionaryService: DictionaryService) {}

  @Query(() => [DictionaryType])
  async getAllDictionaries() {
    return await this.DictionaryService.findAll();
  }

  @Query(() => DictionaryType)
  async getDictionaryByID(@Args('dictionaryID') dictionaryID: String) {
    return await this.DictionaryService.findByID(dictionaryID);
  }

  @Mutation(() => EntryType)
  async createEntryByDictionaryID(
    @Args('newEntry') newEntry: NewEntryType,
    @Args('dictionaryID') dictionaryID: String,
  ) {
    return this.DictionaryService.createEntryByDictionaryID(
      newEntry,
      dictionaryID,
    );
  }
}
