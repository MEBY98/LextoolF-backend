import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { DescriptorType } from 'src/descriptor/type/descriptor.types.dto';

//ContornoDefinition
@ObjectType()
export class ContornoDefinitionObjectType {
  @Field({ nullable: true })
  definition: string;
  @Field({ nullable: true })
  typeOfDefinition: DescriptorType;
  @Field({ nullable: true })
  argumentalSchema: DescriptorType;
  @Field(() => [DescriptorType], { nullable: true })
  relationship: DescriptorType[];

  @Field({ nullable: true })
  contorno: string;
  @Field(() => [DescriptorType], { nullable: true })
  typeOfContorno: DescriptorType[];
  @Field(() => [DescriptorType], { nullable: true })
  positionOfContorno: DescriptorType[];
  @Field(() => [DescriptorType], { nullable: true })
  formatOfContorno: DescriptorType[];
}

@ObjectType()
export class ContornoDefinitionToEditType {
  @Field({ nullable: true })
  definition: string;
  @Field({ nullable: true })
  typeOfDefinition: string;
  @Field()
  argumentalSchema: string;
  @Field(() => [String], { nullable: true })
  relationship: string[];

  @Field({ nullable: true })
  contorno: string;
  @Field(() => [String], { nullable: true })
  typeOfContorno: string[];
  @Field(() => [String], { nullable: true })
  positionOfContorno: string[];
  @Field(() => [String], { nullable: true })
  formatOfContorno: string[];
}

@InputType()
export class ContornoDefinitionInputType {
  @Field({ nullable: true })
  definition: string;
  @Field({ nullable: true })
  typeOfDefinition: string;
  @Field({ nullable: true })
  argumentalSchema: string;
  @Field(() => [String], { nullable: true })
  relationship: string[];

  @Field({ nullable: true })
  contorno: string;
  @Field(() => [String], { nullable: true })
  typeOfContorno: string[];
  @Field(() => [String], { nullable: true })
  positionOfContorno: string[];
  @Field(() => [String], { nullable: true })
  formatOfContorno: string[];
}

@InputType()
export class EditedContornoDefinitionType {
  @Field()
  definition: string;
  @Field()
  typeOfDefinition: string;
  @Field()
  argumentalSchema: string;
  @Field(() => [String], { nullable: true })
  relationship: string[];

  @Field()
  contorno: string;
  @Field(() => [String], { nullable: true })
  typeOfContorno: string[];
  @Field(() => [String], { nullable: true })
  positionOfContorno: string[];
  @Field(() => [String], { nullable: true })
  formatOfContorno: string[];
}
