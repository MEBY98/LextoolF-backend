import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { DescriptorType } from 'src/descriptor/type/descriptor.types.dto';
import { Ubicationtype } from 'src/ubication/type/ubication.type';
import {
  ContornoDefinitionObjectType,
  ContornoDefinitionInputType,
  ContornoDefinitionToEditType,
  EditedContornoDefinitionType,
} from './ContornoAndDefinition.type';
import {
  ExampleInputType,
  ExampleObjectType,
  ExampleToEditType,
  EditedExampleType,
} from './Example.type';
import {
  UseInformationInputType,
  UseInformationObjectType,
  UseInformationToEditType,
  EditedUseInformationType,
} from './UseInformation.type';

@ObjectType()
export class UFtype {
  @Field(() => ID)
  id?: string;
  @Field()
  UF: string;
  @Field(() => Ubicationtype)
  ubication: Ubicationtype;
  @Field(() => [DescriptorType], { nullable: true })
  generalDescription: [DescriptorType];
  @Field(() => [UseInformationObjectType], { nullable: true })
  useInformation: [UseInformationObjectType];
  @Field(() => [[DescriptorType]], { nullable: true })
  orderLemma: [[DescriptorType]];
  @Field(() => [ContornoDefinitionObjectType], { nullable: true })
  ContornoDefinition: [ContornoDefinitionObjectType];
  @Field(() => ExampleObjectType, { nullable: true })
  example: ExampleObjectType;
  @Field(() => [[DescriptorType]], { nullable: true })
  paradigmaticInfo: [[DescriptorType]];
}

@ObjectType()
export class UFToEditType {
  @Field(() => ID)
  id?: string;
  @Field()
  UF: string;
  @Field(() => String)
  ubication: string;
  @Field(() => [String], { nullable: true })
  generalDescription: string[];
  @Field(() => [UseInformationToEditType], { nullable: true })
  useInformation: [UseInformationToEditType];
  @Field(() => [[String]], { nullable: true })
  orderLemma: string[][];
  @Field(() => [ContornoDefinitionToEditType], { nullable: true })
  ContornoDefinition: [ContornoDefinitionToEditType];
  @Field(() => ExampleToEditType, { nullable: true })
  example: ExampleToEditType;
  @Field(() => [String], { nullable: true })
  paradigmaticInfo: [string];
}

@InputType()
export class NewUFtype {
  @Field()
  UF: string;
  @Field(() => String)
  ubication: string;
  @Field(() => [String], { nullable: true })
  generalDescription: string[];
  @Field(() => [UseInformationInputType], { nullable: true })
  useInformation: [UseInformationInputType];
  @Field(() => [[String]], { nullable: true })
  orderLemma: string[][];
  @Field(() => [ContornoDefinitionInputType], { nullable: true })
  ContornoDefinition: [ContornoDefinitionInputType];
  @Field(() => ExampleInputType, { nullable: true })
  example: ExampleInputType;
  @Field(() => [String], { nullable: true })
  paradigmaticInfo: [string];
}

@InputType()
export class EditedUFType {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field()
  UF: string;
  @Field(() => String)
  ubication: string;
  @Field(() => [String], { nullable: true })
  generalDescription: string[];
  @Field(() => [EditedUseInformationType], { nullable: true })
  useInformation: [EditedUseInformationType];
  @Field(() => [[String]], { nullable: true })
  orderLemma: string[][];
  @Field(() => [EditedContornoDefinitionType], { nullable: true })
  ContornoDefinition: [EditedContornoDefinitionType];
  @Field(() => EditedExampleType, { nullable: true })
  example: EditedExampleType;
  @Field(() => [String], { nullable: true })
  paradigmaticInfo: string[];
}
