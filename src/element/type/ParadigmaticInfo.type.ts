import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { DescriptorType } from 'src/descriptor/type/descriptor.types.dto';

@ObjectType()
export class ParadigmaticInfoObjectType {
  @Field({ nullable: true })
  typeOfRelationship: DescriptorType;
  @Field(() => [DescriptorType], { nullable: true })
  formOfPresentation: DescriptorType[];
  @Field(() => [DescriptorType], { nullable: true })
  position: DescriptorType[];
}

@ObjectType()
export class ParadigmaticInfoToEditType {
  @Field({ nullable: true })
  typeOfRelationship: string;
  @Field(() => [String], { nullable: true })
  formOfPresentation: string[];
  @Field(() => [String], { nullable: true })
  position: string[];
}

@InputType()
export class ParadigmaticInfoInputType {
  @Field({ nullable: true })
  typeOfRelationship: string;
  @Field(() => [String], { nullable: true })
  formOfPresentation: string[];
  @Field(() => [String], { nullable: true })
  position: string[];
}

@InputType()
export class EditedParadigmaticInfoType {
  @Field({ nullable: true })
  typeOfRelationship: string;
  @Field(() => [String], { nullable: true })
  formOfPresentation: string[];
  @Field(() => [String], { nullable: true })
  position: string[];
}
