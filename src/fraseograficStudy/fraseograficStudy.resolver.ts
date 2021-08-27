import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FraseograficStudyService } from './fraseograficStudy.service';
import {
  FraseograficStudyType,
  NewfraseograficStudyType,
  EditedfraseograficStudyType,
  FraseograficStudyToEditType,
} from './type/fraseograficStudy.types';
// import {
//   NewDictionaryType,
//   DictionaryType,
//   EditDictionaryObjectType,
// } from 'src/dictionary/type/dictionary.types';

@Resolver()
export class FraseograficStudyResolver {
  constructor(
    private readonly fraseograficStudyService: FraseograficStudyService,
  ) {}

  @Query(() => [FraseograficStudyType])
  async getAllStudies() {
    return this.fraseograficStudyService.findall();
  }

  @Query(() => FraseograficStudyToEditType)
  async getStudyByID(@Args('studyID') studyID: string) {
    return this.fraseograficStudyService.findByID(studyID);
  }

  @Mutation(() => FraseograficStudyType)
  async createStudy(
    @Args('fraseograficStudy') fraseograficStudy: NewfraseograficStudyType,
  ) {
    return this.fraseograficStudyService.createStudy(fraseograficStudy);
  }

  @Mutation(() => FraseograficStudyType)
  async deleteStudyByID(@Args('studyID') studyID: string) {
    console.log(studyID);
    return this.fraseograficStudyService.deleteStudy(studyID);
  }

  // @Mutation(() => EditDictionaryObjectType)
  // async createDictionaryByStudyID(
  //   @Args('newDictionary') newDictionary: NewDictionaryType,
  //   @Args('studyID') studyID: string,
  // ) {
  //   return this.fraseograficStudyService.createDictionaryByStudyID(
  //     newDictionary,
  //     studyID,
  //   );
  // }

  @Mutation(() => FraseograficStudyType)
  async editStudy(@Args('newStudy') newStudy: EditedfraseograficStudyType) {
    return this.fraseograficStudyService.editStudy(newStudy);
  }
}
