import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { DescriptorType } from 'src/descriptor/type/descriptor.types.dto';

//DescriptorsDefinition
@ObjectType()
export class DescriptorsDefinitionObjectType {
  @Field({ nullable: true })
  typeOfDefinition: DescriptorType;
  @Field({ nullable: true })
  argumentalSchema: DescriptorType;
  @Field(() => [DescriptorType], { nullable: true })
  relationship: DescriptorType[];
}

@ObjectType()
export class DescriptorsDefinitionToEditType {
  @Field({ nullable: true })
  typeOfDefinition: string;
  @Field({ nullable: true })
  argumentalSchema: string;
  @Field(() => [String], { nullable: true })
  relationship: string[];
}

@InputType()
export class DescriptorsDefinitionInputType {
  @Field({ nullable: true })
  typeOfDefinition: string;
  @Field({ nullable: true })
  argumentalSchema: string;
  @Field(() => [String], { nullable: true })
  relationship: string[];
}

@InputType()
export class EditedDescriptorsDefinitionType {
  @Field({ nullable: true })
  typeOfDefinition: string;
  @Field({ nullable: true })
  argumentalSchema: string;
  @Field(() => [String], { nullable: true })
  relationship: string[];
}

//Definition
@ObjectType()
export class DefinitionObjectType {
  @Field()
  definition: string;
  @Field(() => DescriptorsDefinitionObjectType)
  descriptors: DescriptorsDefinitionObjectType;
}

@ObjectType()
export class DefinitionToEditType {
  @Field({ nullable: true })
  definition: string;
  @Field(() => DescriptorsDefinitionToEditType, { nullable: true })
  descriptors: DescriptorsDefinitionToEditType;
}

@InputType()
export class DefinitionInputType {
  @Field({ nullable: true })
  definition: string;
  @Field(() => DescriptorsDefinitionInputType, { nullable: true })
  descriptors: DescriptorsDefinitionInputType;
}

@InputType()
export class EditedDefinitionType {
  @Field({ nullable: true })
  definition: string;
  @Field(() => EditedDescriptorsDefinitionType, { nullable: true })
  descriptors: EditedDescriptorsDefinitionType;
}

//DescriptorsContorno
@ObjectType()
export class DescriptorsContornoObjectType {
  @Field(() => [DescriptorType], { nullable: true })
  typeOfContorno: DescriptorType[];
  @Field(() => [DescriptorType], { nullable: true })
  positionOfContorno: DescriptorType[];
  @Field(() => [DescriptorType], { nullable: true })
  formatOfContorno: DescriptorType[];
}

@ObjectType()
export class DescriptorsContornoToEditType {
  @Field(() => [String], { nullable: true })
  typeOfContorno: string[];
  @Field(() => [String], { nullable: true })
  positionOfContorno: string[];
  @Field(() => [String], { nullable: true })
  formatOfContorno: string[];
}

@InputType()
export class DescriptorsContornoInputType {
  @Field(() => [String], { nullable: true })
  typeOfContorno: string[];
  @Field(() => [String], { nullable: true })
  positionOfContorno: string[];
  @Field(() => [String], { nullable: true })
  formatOfContorno: string[];
}

@InputType()
export class EditedDescriptorsContornoType {
  @Field(() => [String], { nullable: true })
  typeOfContorno: string[];
  @Field(() => [String], { nullable: true })
  positionOfContorno: string[];
  @Field(() => [String], { nullable: true })
  formatOfContorno: string[];
}

//Contorno
@ObjectType()
export class ContornoObjectType {
  @Field()
  contorno: string;
  @Field(() => DescriptorsContornoObjectType)
  descriptors: DescriptorsContornoObjectType;
}

@ObjectType()
export class ContornoToEditType {
  @Field({ nullable: true })
  contorno: string;
  @Field(() => DescriptorsContornoToEditType, { nullable: true })
  descriptors: DescriptorsContornoToEditType;
}

@InputType()
export class ContornoInputType {
  @Field({ nullable: true })
  contorno: string;
  @Field(() => DescriptorsContornoInputType, { nullable: true })
  descriptors: DescriptorsContornoInputType;
}

@InputType()
export class EditedContornoType {
  @Field({ nullable: true })
  contorno: string;
  @Field(() => EditedDescriptorsContornoType, { nullable: true })
  descriptors: EditedDescriptorsContornoType;
}

//ContornoDefinition
@ObjectType()
export class ContornoDefinitionObjectType {
  @Field(() => DefinitionObjectType)
  definition: DefinitionObjectType;
  @Field(() => ContornoObjectType)
  contorno: ContornoObjectType;
}

@ObjectType()
export class ContornoDefinitionToEditType {
  @Field(() => DefinitionToEditType, { nullable: true })
  definition: DefinitionToEditType;
  @Field(() => ContornoToEditType, { nullable: true })
  contorno: ContornoToEditType;
}

@InputType()
export class ContornoDefinitionInputType {
  @Field(() => DefinitionInputType, { nullable: true })
  definition: DefinitionInputType;
  @Field(() => ContornoInputType, { nullable: true })
  contorno: ContornoInputType;
}

@InputType()
export class EditedContornoDefinitionType {
  @Field(() => EditedDefinitionType, { nullable: true })
  definition: EditedDefinitionType;
  @Field(() => EditedContornoType, { nullable: true })
  contorno: EditedContornoType;
}
