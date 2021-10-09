import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DictionaryInfoService } from './dictionaryInfo.service';
import {
  DictionaryInfotype,
  NewDictionaryInfotype,
  EditedDictionaryInfotype,
} from './type/dictionaryInfo.type';

@Resolver()
export class DictionaryInfoResolver {
  constructor(private readonly DictionaryInfoService: DictionaryInfoService) {}

  @Query(() => [DictionaryInfotype])
  getAllDictionaryInfo() {
    return this.DictionaryInfoService.findAll();
  }

  @Query(() => DictionaryInfotype)
  getDictionaryInfoById(@Args('id') id: string) {
    return this.DictionaryInfoService.findById(id);
  }

  @Mutation(() => DictionaryInfotype)
  createDictionaryInfo(
    @Args('newDictionaryInfo') newDictionaryInfo: NewDictionaryInfotype,
  ) {
    return this.DictionaryInfoService.create(newDictionaryInfo);
  }

  @Mutation(() => DictionaryInfotype)
  editDictionaryInfo(
    @Args('editedDictionaryInfo')
    editedDictionaryInfo: EditedDictionaryInfotype,
  ) {
    return this.DictionaryInfoService.edit(editedDictionaryInfo);
  }
}
