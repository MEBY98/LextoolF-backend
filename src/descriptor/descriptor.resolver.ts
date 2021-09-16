import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  DescriptorType,
  NewDescriptorType,
  DescriptorInputType,
} from './type/descriptor.types.dto';
import { DescriptorService } from './descriptor.service';

@Resolver()
export class DescriptorResolver {
  constructor(private readonly descriptorService: DescriptorService) {}

  @Query(() => [DescriptorType])
  getAllDescriptors() {
    return this.descriptorService.findAll();
  }
  @Query(() => DescriptorType)
  getDescriptorByDescription(@Args('description') description: string) {
    return this.descriptorService.findByDescription(description);
  }
  @Mutation(() => DescriptorType)
  editDescriptor(
    @Args('editedDescriptor') editedDescriptor: DescriptorInputType,
  ) {
    return this.descriptorService.editDescriptor(editedDescriptor);
  }
}
