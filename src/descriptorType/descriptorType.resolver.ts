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
  async getAllGeneralDescriptionDescriptorsTypes() {
    return await this.DescriptorTypeService.findAllGeneralDescriptionDescriptorsTypes();
  }
  @Query(() => [DescriptorTypeType])
  async getAllDefinitionDescriptorsTypes() {
    return await this.DescriptorTypeService.findAllDefinitionDescriptorsTypes();
  }
  @Query(() => [DescriptorTypeType])
  async getAllContornoDescriptorsTypes() {
    return await this.DescriptorTypeService.findAllContornoDescriptorsTypes();
  }
  @Query(() => [DescriptorTypeType])
  async getAllExampleDescriptorsTypes() {
    return await this.DescriptorTypeService.findAllExampleDescriptorsTypes();
  }
  @Query(() => [DescriptorTypeType])
  async getAllParadigmaticInfoDescriptorsTypes() {
    return await this.DescriptorTypeService.findAllParadigmaticInfoDescriptorsTypes();
  }

  @Mutation(() => DescriptorTypeType)
  createDescriptorType(
    @Args('newDescriptorType') newDescriptorType: NewDescriptorTypeType,
  ) {
    return this.DescriptorTypeService.createDescriptorType(newDescriptorType);
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
  // @Mutation()
  // createMoreDescriptorType(
  //   @Args('newsDescriptorType') newsDescriptorType: [NewDescriptorTypeType],
  // ) {
  //   this.DescriptorTypeService.createManyDescriptorType(newsDescriptorType);
  // }
}
