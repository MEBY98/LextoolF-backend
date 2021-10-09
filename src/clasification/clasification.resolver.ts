import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClasificationService } from './clasification.service';
import {
  Clasificationtype,
  NewClasificationtype,
  EditedClasificationType,
} from './type/clasification.type';

@Resolver()
export class ClasificationResolver {
  constructor(private readonly clasificationService: ClasificationService) {}

  @Query(() => [Clasificationtype])
  getAllClasifications() {
    return this.clasificationService.findAll();
  }

  @Mutation(() => Clasificationtype)
  createClasification(
    @Args('newClasification') newClasification: NewClasificationtype,
  ) {
    return this.clasificationService.createClasification(newClasification);
  }

  @Mutation(() => Clasificationtype)
  editClasification(
    @Args('editedClasification') editedClasification: EditedClasificationType,
  ) {
    return this.clasificationService.edit(editedClasification);
  }
}
