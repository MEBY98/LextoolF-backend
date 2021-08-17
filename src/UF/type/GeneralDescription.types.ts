import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { DescriptorType } from 'src/descriptor/type/descriptor.types.dto';

@ObjectType()
export class GeneralDescriptionObjectType {
  @Field({ nullable: true })
  type: DescriptorType;
  @Field(() => DescriptorType, { nullable: true })
  structure: DescriptorType;
  @Field(() => DescriptorType, { nullable: true })
  conceptualDomain: DescriptorType;
}

@ObjectType()
export class GeneralDescriptorToEditType {
  @Field({ nullable: true })
  type: string;
  @Field({ nullable: true })
  structure: string;
  @Field({ nullable: true })
  conceptualDomain: string;
}

@InputType()
export class GeneralDescriptorInputType {
  @Field({ nullable: true })
  type: string;
  @Field({ nullable: true })
  structure: string;
  @Field({ nullable: true })
  conceptualDomain: string;
}

@InputType()
export class EditedGeneralDescriptorType {
  @Field({ nullable: true })
  type: string;
  @Field({ nullable: true })
  structure: string;
  @Field({ nullable: true })
  conceptualDomain: string;
}
