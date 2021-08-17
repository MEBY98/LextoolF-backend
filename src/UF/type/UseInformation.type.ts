import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { DescriptorType } from 'src/descriptor/type/descriptor.types.dto';

//UseInformationDescriptors
@ObjectType()
export class UseInformationDescriptorsObjectType {
  @Field(() => DescriptorType, { nullable: true })
  position: DescriptorType;
  @Field(() => DescriptorType, { nullable: true })
  format: DescriptorType;
  @Field(() => DescriptorType, { nullable: true })
  tipography: DescriptorType;
}

@ObjectType()
export class UseInformationDescriptorsToEditType {
  @Field({ nullable: true })
  position: string;
  @Field({ nullable: true })
  format: string;
  @Field({ nullable: true })
  tipography: string;
}

@InputType()
export class UseInformationDescriptorsInputType {
  @Field({ nullable: true })
  position: string;
  @Field({ nullable: true })
  format: string;
  @Field({ nullable: true })
  tipography: string;
}

@InputType()
export class EditedUseInformationDescriptorsType {
  @Field({ nullable: true })
  position: string;
  @Field({ nullable: true })
  format: string;
  @Field({ nullable: true })
  tipography: string;
}

//UseInformation
@ObjectType()
export class UseInformationObjectType {
  @Field({ nullable: true })
  anotation: string;
  @Field(() => UseInformationDescriptorsObjectType, { nullable: true })
  descriptors: UseInformationDescriptorsObjectType;
}

@ObjectType()
export class UseInformationToEditType {
  @Field({ nullable: true })
  anotation: string;
  @Field(() => UseInformationDescriptorsToEditType, { nullable: true })
  descriptors: UseInformationDescriptorsToEditType;
}

@InputType()
export class UseInformationInputType {
  @Field({ nullable: true })
  anotation: string;
  @Field(() => UseInformationDescriptorsInputType, { nullable: true })
  descriptors: UseInformationDescriptorsInputType;
}

@InputType()
export class EditedUseInformationType {
  @Field({ nullable: true })
  anotation: string;
  @Field(() => EditedUseInformationDescriptorsType, { nullable: true })
  descriptors: EditedUseInformationDescriptorsType;
}
