import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ElementService } from './element.service';
import { ElementType, NewElementType } from './type/element.type';
import { Ubicationtype } from 'src/ubication/type/ubication.type';

@Resolver()
export class ElementResolver {
  constructor(private readonly ElementService: ElementService) {}

  @Query(() => [ElementType])
  getAllElements() {
    return this.ElementService.findAll();
  }

  @Query(() => Ubicationtype)
  getUbicationByElementID(@Args('elementID') elementID: string) {
    return this.ElementService.ubicationByElementID(elementID);
  }

  @Mutation(() => ElementType)
  createElement(@Args('newElement') newElement: NewElementType) {
    return this.ElementService.createAsync(newElement);
  }
}
