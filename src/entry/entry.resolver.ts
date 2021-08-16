import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EntryService } from './entry.service';
import {
  EntryType,
  NewEntryType,
  EntryToEditType,
  EditedEntryType,
} from './type/entry.type';

@Resolver()
export class EntryResolver {
  constructor(private readonly EntryService: EntryService) {}

  @Query(() => [EntryType])
  async getAllEntries() {
    return await this.EntryService.findAll();
  }

  @Query(() => EntryToEditType)
  async getEntryByID(@Args('entryID') entryID: string) {
    return await this.EntryService.findById(entryID);
  }

  @Query(() => [String])
  async getEntryUbicationsByID(@Args('entryID') entryID: string) {
    return await this.EntryService.entryUbicationsByID(entryID);
  }

  @Mutation(() => [EntryType])
  async createEntry(@Args('entry') entry: NewEntryType) {
    const result = await this.EntryService.createEntry(entry);
    console.log('fromresolverResult:', result);
  }

  @Mutation(() => EntryType)
  async editEntry(@Args('entry') entry: EditedEntryType) {
    const result = await this.EntryService.updateEntry(entry);
  }
}
