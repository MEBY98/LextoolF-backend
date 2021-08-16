import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DescriptorType, NewDescriptorType } from './type/descriptor.types.dto';
import { DescriptorService } from './descriptor.service';

@Resolver()
export class DescriptorResolver {
  constructor(private readonly descriptorService: DescriptorService) {}

  @Query(() => [DescriptorType])
  getAllDescriptors() {
    return this.descriptorService.findAll();
  }
}
