import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import {
  ContornoDefinitionInputType,
  ContornoDefinitionObjectType,
  ContornoDefinitionToEditType,
  EditedContornoDefinitionType,
} from './ContornoAndDefinition.type';
import {
  GeneralDescriptionInputType,
  GeneralDescriptionObjectType,
  GeneralDescriptionToEditType,
  EditedGeneralDescriptionType,
} from './GeneralDescription.types';
import {
  OrderLemmaInputType,
  OrderLemmaObjectType,
  OrderLemmaToEditType,
  EditedOrderLemmaType,
} from './OrderLemma.type';
import {
  UseInformationInputType,
  UseInformationObjectType,
  UseInformationToEditType,
  EditedUseInformationType,
} from './UseInformation.type';
import {
  ExampleInputType,
  ExampleObjectType,
  ExampleToEditType,
  EditedExampleType,
} from './Example.type';
import {
  ParadigmaticInfoInputType,
  ParadigmaticInfoObjectType,
  ParadigmaticInfoToEditType,
  EditedParadigmaticInfoType,
} from './ParadigmaticInfo.type';
import { Clasificationtype } from 'src/clasification/type/clasification.type';
import { Ubicationtype } from 'src/ubication/type/ubication.type';

@ObjectType()
export class ElementType {
  @Field(() => ID)
  id?: string;
  @Field()
  element: string;
  @Field()
  clasification: Clasificationtype;
  @Field()
  ubication: Ubicationtype;
  @Field({ nullable: true })
  generalDescription: GeneralDescriptionObjectType;
  @Field({ nullable: true })
  orderLemma: OrderLemmaObjectType;
  @Field(() => [UseInformationObjectType], { nullable: true })
  useInformation: UseInformationObjectType[];
  @Field(() => [ContornoDefinitionObjectType], { nullable: true })
  contornoDefinition: ContornoDefinitionObjectType[];
  @Field({ nullable: true })
  example: ExampleObjectType;
  @Field({ nullable: true })
  paradigmaticInfo: ParadigmaticInfoObjectType;
}
@ObjectType()
export class ElementDescriptorsAsStringType {
  @Field(() => ID)
  id?: string;
  @Field()
  element: string;
  @Field()
  clasification: Clasificationtype;
  @Field()
  ubication: Ubicationtype;
  @Field({ nullable: true })
  generalDescription: GeneralDescriptionToEditType;
  @Field({ nullable: true })
  orderLemma: OrderLemmaToEditType;
  @Field(() => [UseInformationToEditType], { nullable: true })
  useInformation: UseInformationToEditType[];
  @Field(() => [ContornoDefinitionToEditType], { nullable: true })
  contornoDefinition: ContornoDefinitionToEditType[];
  @Field({ nullable: true })
  example: ExampleToEditType;
  @Field({ nullable: true })
  paradigmaticInfo: ParadigmaticInfoToEditType;
}

@ObjectType()
export class ElementToEditType {
  @Field(() => ID)
  id?: string;
  @Field()
  element: string;
  @Field()
  clasification: string;
  @Field()
  ubication: string;
  @Field({ nullable: true })
  generalDescription: GeneralDescriptionToEditType;
  @Field({ nullable: true })
  orderLemma: OrderLemmaToEditType;
  @Field(() => [UseInformationToEditType], { nullable: true })
  useInformation: UseInformationToEditType[];
  @Field(() => [ContornoDefinitionToEditType], { nullable: true })
  contornoDefinition: ContornoDefinitionToEditType[];
  @Field({ nullable: true })
  example: ExampleToEditType;
  @Field({ nullable: true })
  paradigmaticInfo: ParadigmaticInfoToEditType;
}

@InputType()
export class NewElementType {
  @Field()
  element: string;
  @Field()
  clasification: string;
  @Field()
  ubication: string;
  @Field({ nullable: true })
  generalDescription: GeneralDescriptionInputType;
  @Field({ nullable: true })
  orderLemma: OrderLemmaInputType;
  @Field(() => [UseInformationInputType], { nullable: true })
  useInformation: UseInformationInputType[];
  @Field(() => [ContornoDefinitionInputType], { nullable: true })
  contornoDefinition: ContornoDefinitionInputType[];
  @Field({ nullable: true })
  example: ExampleInputType;
  @Field({ nullable: true })
  paradigmaticInfo: ParadigmaticInfoInputType;
}

@InputType()
export class EditedElementType {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field()
  element: string;
  @Field()
  clasification: string;
  @Field()
  ubication: string;
  @Field({ nullable: true })
  generalDescription: EditedGeneralDescriptionType;
  @Field({ nullable: true })
  orderLemma: EditedOrderLemmaType;
  @Field(() => [EditedUseInformationType], { nullable: true })
  useInformation: EditedUseInformationType[];
  @Field(() => [EditedContornoDefinitionType], { nullable: true })
  contornoDefinition: EditedContornoDefinitionType[];
  @Field({ nullable: true })
  example: EditedExampleType;
  @Field({ nullable: true })
  paradigmaticInfo: EditedParadigmaticInfoType;
}
