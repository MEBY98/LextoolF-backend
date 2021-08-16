import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UFService } from './UF.service';
import { UFtype, NewUFtype } from './type/UF.type';

@Resolver()
export class UFResolver {
  constructor(private readonly UFService: UFService) {}

  @Query(() => [UFtype])
  getAllUFs() {
    return this.UFService.getAllUFs();
  }

  @Mutation(() => UFtype)
  createUF(@Args('newUF') newUF: NewUFtype) {
    return this.UFService.createUF(newUF);
  }
}
