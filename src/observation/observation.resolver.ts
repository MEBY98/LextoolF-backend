import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ObservationService } from './observation.service';
import {
  ObservationType,
  NewObservationType,
} from './type/observation.types.dto';

@Resolver()
export class ObservationResolver {
  constructor(private readonly observationService: ObservationService) {}

  @Query(() => [ObservationType])
  async getAllUseInformationObservations() {
    return await this.observationService.findAllUseInformationObservations();
  }

  @Query(() => [ObservationType])
  async getAllOrderLemmaObservations() {
    return await this.observationService.findAllOrderLemmaObservations();
  }

  @Mutation(() => ObservationType)
  createObservation(
    @Args('newObservationType') newObservationType: NewObservationType,
  ) {
    return this.observationService.createObservation(newObservationType);
  }
}
