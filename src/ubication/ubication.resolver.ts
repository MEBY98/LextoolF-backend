import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UbicationService } from './ubication.service';
import {
  Ubicationtype,
  NewUbicationtype,
  EditedUbicationType,
} from './type/ubication.type';

@Resolver()
export class UbicationResolver {
  constructor(private readonly ubicationService: UbicationService) {}

  @Query(() => [Ubicationtype])
  async getAllUbications() {
    return await this.ubicationService.findAll();
  }

  @Mutation(() => Ubicationtype)
  createUbication(@Args('newUbication') newUbication: NewUbicationtype) {
    return this.ubicationService.createUbication(newUbication);
  }

  @Mutation(() => Ubicationtype)
  editUbication(@Args('editedUbication') editedUbication: EditedUbicationType) {
    return this.ubicationService.edit(editedUbication);
  }
}
