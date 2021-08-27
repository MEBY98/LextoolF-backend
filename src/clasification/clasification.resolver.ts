import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClasificationService } from './clasification.service';
import {
  Clasificationtype,
  NewClasificationtype,
} from './type/clasification.type';

@Resolver()
export class ClasificationResolver {
  constructor(private readonly ClasificationService: ClasificationService) {}

  @Query(() => [Clasificationtype])
  getAllClasifications() {
    return this.ClasificationService.findAll();
  }

  @Mutation(() => Clasificationtype)
  createClasification(
    @Args('newClasification') newClasification: NewClasificationtype,
  ) {
    return this.ClasificationService.createClasification(newClasification);
  }
}
