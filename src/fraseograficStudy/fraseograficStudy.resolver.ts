import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FraseograficStudyService } from './fraseograficStudy.service';
import {
  fraseograficStudyType,
  NewfraseograficStudyType,
  CreatedfraseograficStudyType,
  EditfraseograficStudyType,
} from './type/fraseograficStudy.types';
import {
  CreatedDictionaryType,
  NewDictionaryType,
} from 'src/dictionary/type/dictionary.types';

@Resolver()
export class FraseograficStudyResolver {
  constructor(
    private readonly fraseograficStudyService: FraseograficStudyService,
  ) {}

  @Query(() => [fraseograficStudyType])
  async getAllStudies() {
    return this.fraseograficStudyService.findall();
  }

  @Query(() => fraseograficStudyType)
  async getStudyByID(@Args('studyID') studyID: String) {
    return this.fraseograficStudyService.findByID(studyID);
  }

  @Mutation(() => CreatedfraseograficStudyType)
  async createStudy(
    @Args('fraseograficStudy') fraseograficStudy: NewfraseograficStudyType,
  ): Promise<CreatedfraseograficStudyType> {
    return this.fraseograficStudyService.createStudy(fraseograficStudy);
  }

  @Mutation(() => fraseograficStudyType)
  async deleteStudyByID(@Args('studyID') studyID: String) {
    console.log(studyID);
    return this.fraseograficStudyService.deleteStudy(studyID);
  }

  @Mutation(() => CreatedDictionaryType)
  async createDictionaryByStudyID(
    @Args('newDictionary') newDictionary: NewDictionaryType,
    @Args('studyID') studyID: String,
  ) {
    return this.fraseograficStudyService.createDictionaryByStudyID(
      newDictionary,
      studyID,
    );
  }

  @Mutation(() => fraseograficStudyType)
  async editStudy(@Args('newStudy') newStudy: EditfraseograficStudyType) {
    return this.fraseograficStudyService.editStudy(newStudy);
  }
}
