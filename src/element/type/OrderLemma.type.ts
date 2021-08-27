import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { DescriptorType } from 'src/descriptor/type/descriptor.types.dto';

@ObjectType()
export class OrderLemmaObjectType {
  @Field(() => [DescriptorType], { nullable: true })
  order: DescriptorType[];
  @Field(() => [DescriptorType], { nullable: true })
  criteriaOfLematization: DescriptorType[];
  @Field(() => [DescriptorType], { nullable: true })
  formalStructure: DescriptorType[];
  @Field(() => DescriptorType, { nullable: true })
  ubicationOfContorno: DescriptorType;
  @Field(() => [DescriptorType], { nullable: true })
  typeOfVariant: DescriptorType[];
  @Field(() => [DescriptorType], { nullable: true })
  formatOfVariant: DescriptorType[];
  @Field(() => [DescriptorType], { nullable: true })
  tipographyOfVariant: DescriptorType[];
}

@ObjectType()
export class OrderLemmaToEditType {
  @Field(() => [String], { nullable: true })
  order: string[];
  @Field(() => [String], { nullable: true })
  criteriaOfLematization: string[];
  @Field(() => [String], { nullable: true })
  formalStructure: string[];
  @Field({ nullable: true })
  ubicationOfContorno: string;
  @Field(() => [String], { nullable: true })
  typeOfVariant: string[];
  @Field(() => [String], { nullable: true })
  formatOfVariant: string[];
  @Field(() => [String], { nullable: true })
  tipographyOfVariant: string[];
}

@InputType()
export class OrderLemmaInputType {
  @Field(() => [String], { nullable: true })
  order: string[];
  @Field(() => [String], { nullable: true })
  criteriaOfLematization: string[];
  @Field(() => [String], { nullable: true })
  formalStructure: string[];
  @Field({ nullable: true })
  ubicationOfContorno: string;
  @Field(() => [String], { nullable: true })
  typeOfVariant: string[];
  @Field(() => [String], { nullable: true })
  formatOfVariant: string[];
  @Field(() => [String], { nullable: true })
  tipographyOfVariant: string[];
}

@InputType()
export class EditedOrderLemmaType {
  @Field(() => [String], { nullable: true })
  order: string[];
  @Field(() => [String], { nullable: true })
  criteriaOfLematization: string[];
  @Field(() => [String], { nullable: true })
  formalStructure: string[];
  @Field({ nullable: true })
  ubicationOfContorno: string;
  @Field(() => [String], { nullable: true })
  typeOfVariant: string[];
  @Field(() => [String], { nullable: true })
  formatOfVariant: string[];
  @Field(() => [String], { nullable: true })
  tipographyOfVariant: string[];
}
