import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EntryService } from './entry.service';
import { EntryType, EntryToEditType, EditedEntryType } from './type/entry.type';

@Resolver()
export class EntryResolver {
  constructor(private readonly EntryService: EntryService) {}

  @Query(() => EntryToEditType)
  async getEntryByID(@Args('entryID') entryID: string) {
    return await this.EntryService.findByIdAsync(entryID);
  }

  @Query(() => [String])
  async getEntryUbicationsByID(@Args('entryID') entryID: string) {
    return await this.EntryService.entryUbicationsByID(entryID);
  }

  @Mutation(() => EntryType)
  async editEntry(@Args('entry') entry: EditedEntryType) {
    return await this.EntryService.updateEntry(entry);
  }
}
