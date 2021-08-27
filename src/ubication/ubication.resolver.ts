import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UbicationService } from './ubication.service';
import { Ubicationtype, NewUbicationtype } from './type/ubication.type';

@Resolver()
export class UbicationResolver {
  constructor(private readonly UbicationService: UbicationService) {}

  @Query(() => [Ubicationtype])
  async getAllUbications() {
    return await this.UbicationService.findAll();
  }

  @Mutation(() => Ubicationtype)
  createUbication(@Args('newUbication') newUbication: NewUbicationtype) {
    return this.UbicationService.createUbication(newUbication);
  }
}
