import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SublemmaService } from './sublemma.service';

@Resolver()
export class SublemmaResolver {
  constructor(private readonly SublemmaService: SublemmaService) {}
}
