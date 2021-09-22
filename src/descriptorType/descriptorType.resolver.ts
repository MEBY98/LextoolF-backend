import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DescriptorTypeService } from './descriptorType.service';
import {
  DescriptorTypeType,
  NewDescriptorTypeType,
} from './type/descriptorType.types.dto';
import {
  DescriptorType,
  NewDescriptorType,
} from 'src/descriptor/type/descriptor.types.dto';

@Resolver()
export class DescriptorTypeResolver {
  constructor(private readonly DescriptorTypeService: DescriptorTypeService) {}

  @Query(() => [DescriptorTypeType])
  getAllDescriptorsTypes() {
    return this.DescriptorTypeService.findAll();
  }
  @Query(() => [DescriptorTypeType])
  async getDescriptorsTypesByTab(@Args('tab') tab: string) {
    return await this.DescriptorTypeService.findByTab(tab);
  }
  @Mutation(() => DescriptorTypeType)
  createDescriptorType(
    @Args('newDescriptorType') newDescriptorType: NewDescriptorTypeType,
  ) {
    return this.DescriptorTypeService.createDescriptorTypeAsync(
      newDescriptorType,
    );
  }
  @Mutation(() => DescriptorType)
  createDescriptorByDescriptorType(
    @Args('descriptorTypeID') descriptorTypeID: string,
    @Args('descriptor') descriptor: NewDescriptorType,
  ) {
    return this.DescriptorTypeService.createDescriptorByDescriptorType(
      descriptorTypeID,
      descriptor,
    );
  }
  @Mutation(() => DescriptorTypeType)
  deleteDescriptorByDescriptorType(
    @Args('descriptorTypeID') descriptorTypeID: string,
    @Args('descriptorID') descriptorID: string,
  ) {
    return this.DescriptorTypeService.deleteDescriptorByDescriptorType(
      descriptorTypeID,
      descriptorID,
    );
  }
}
