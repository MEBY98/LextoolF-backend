import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DictionaryType } from './type/dictionary.types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  @Mutation(() => Boolean)
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
