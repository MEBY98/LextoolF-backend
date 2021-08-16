import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LemmaService } from './lemma.service';

@Resolver()
export class LemmaResolver {
  constructor(private readonly LemmaService: LemmaService) {}
}
