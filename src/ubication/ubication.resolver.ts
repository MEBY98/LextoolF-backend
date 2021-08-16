import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UbicationService } from './ubication.service';
import { Ubicationtype, NewUbicationtype } from './type/ubication.type';
import { Clasificationtype } from 'src/clasification/type/clasification.type';

@Resolver()
export class UbicationResolver {
  constructor(private readonly UbicationService: UbicationService) {}

  @Query(() => [Ubicationtype])
  async getAllUbications() {
    return await this.UbicationService.findAll();
  }

  @Query(() => [Clasificationtype])
  async getAllLemmaClasifications() {
    return await this.UbicationService.findAllLemmaClasifications();
  }

  @Query(() => [Clasificationtype])
  async getAllSublemmaClasifications() {
    return await this.UbicationService.findAllSublemmaClasifications();
  }

  @Mutation(() => Ubicationtype)
  createUbication(@Args('newUbication') newUbication: NewUbicationtype) {
    return this.UbicationService.createUbication(newUbication);
  }
}
