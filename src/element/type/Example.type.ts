import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { DescriptorType } from 'src/descriptor/type/descriptor.types.dto';

@ObjectType()
export class ExampleObjectType {
  @Field({ nullable: true })
  anotation: string;
  @Field(() => [DescriptorType], { nullable: true })
  typeOfExample: DescriptorType[];
  @Field(() => [DescriptorType], { nullable: true })
  formatOfExample: DescriptorType[];
  @Field(() => [DescriptorType], { nullable: true })
  functionOfExample: DescriptorType[];
}

@ObjectType()
export class ExampleToEditType {
  @Field({ nullable: true })
  anotation: string;
  @Field(() => [String], { nullable: true })
  typeOfExample: string[];
  @Field(() => [String], { nullable: true })
  formatOfExample: string[];
  @Field(() => [String], { nullable: true })
  functionOfExample: string[];
}

@InputType()
export class ExampleInputType {
  @Field({ nullable: true })
  anotation: string;
  @Field(() => [String], { nullable: true })
  typeOfExample: string[];
  @Field(() => [String], { nullable: true })
  formatOfExample: string[];
  @Field(() => [String], { nullable: true })
  functionOfExample: string[];
}

@InputType()
export class EditedExampleType {
  @Field({ nullable: true })
  anotation: string;
  @Field(() => [String], { nullable: true })
  typeOfExample: string[];
  @Field(() => [String], { nullable: true })
  formatOfExample: string[];
  @Field(() => [String], { nullable: true })
  functionOfExample: string[];
}
