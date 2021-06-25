import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EntryService } from './entry.service';
import { EntryType, CreatedEntryType, NewEntryType } from './type/entry.type';

@Resolver()
export class EntryResolver {
  constructor(private readonly EntryService: EntryService) {}

  @Query(() => [EntryType])
  async getAllEntries() {
    return await this.EntryService.findAll();
  }

  @Mutation(() => CreatedEntryType)
  async createEntry(@Args('entry') entry: NewEntryType) {
    return await this.EntryService.createEntry(entry);
  }
}
