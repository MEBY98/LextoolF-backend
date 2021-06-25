import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UFService } from './UF.service';

@Resolver()
export class UFResolver {
  constructor(private readonly UFService: UFService) {}
}
