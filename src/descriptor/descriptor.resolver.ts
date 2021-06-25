import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DescriptorType, NewDescriptorType, CreatedDescriptorType } from './type/descriptor.types.dto';
import { DescriptorService } from './descriptor.service';


@Resolver((of) => DescriptorType)
export class DescriptorResolver {
  constructor(private readonly descriptorService: DescriptorService) { }

  @Query(() => [DescriptorType])
  async getAllDescriptors(): Promise<DescriptorType[]> {
    return await this.descriptorService.findAll();
  }

  @Mutation(() => CreatedDescriptorType)
  async createDescriptor(@Args('descriptor') descriptor: NewDescriptorType): Promise<CreatedDescriptorType> {
    return this.descriptorService.createDescriptor(descriptor);
  }
}
