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
import {
  GeneralDescriptionObjectType,
  GeneralDescriptorToEditType,
  GeneralDescriptorInputType,
  EditedGeneralDescriptorType,
} from './GeneralDescription.types';
import {
  OrderLemmaObjectType,
  OrderLemmaToEditType,
  OrderLemmaInputType,
  EditedOrderLemmaType,
} from './OrderLemma.type';
import {
  EditedParadigmaticInfoType,
  ParadigmaticInfoInputType,
  ParadigmaticInfoToEditType,
  ParadigmaticInfoObjectType,
} from './ParadigmaticInfo.type';

@ObjectType()
export class UFtype {
  @Field(() => ID)
  id?: string;
  @Field()
  UF: string;
  @Field(() => Ubicationtype)
  ubication: Ubicationtype;
  @Field(() => GeneralDescriptionObjectType, { nullable: true })
  generalDescription: GeneralDescriptionObjectType;
  @Field(() => [UseInformationObjectType], { nullable: true })
  useInformation: UseInformationObjectType[];
  @Field(() => OrderLemmaObjectType, { nullable: true })
  orderLemma: OrderLemmaObjectType;
  @Field(() => [ContornoDefinitionObjectType], { nullable: true })
  ContornoDefinition: ContornoDefinitionObjectType[];
  @Field(() => ExampleObjectType, { nullable: true })
  example: ExampleObjectType;
  @Field(() => ParadigmaticInfoObjectType, { nullable: true })
  paradigmaticInfo: ParadigmaticInfoObjectType;
}

@ObjectType()
export class UFToEditType {
  @Field(() => ID)
  id?: string;
  @Field()
  UF: string;
  @Field(() => String)
  ubication: string;
  @Field(() => GeneralDescriptorToEditType, { nullable: true })
  generalDescription: GeneralDescriptorToEditType;
  @Field(() => [UseInformationToEditType], { nullable: true })
  useInformation: UseInformationToEditType[];
  @Field(() => OrderLemmaToEditType, { nullable: true })
  orderLemma: OrderLemmaToEditType;
  @Field(() => [ContornoDefinitionToEditType], { nullable: true })
  ContornoDefinition: ContornoDefinitionToEditType[];
  @Field(() => ExampleToEditType, { nullable: true })
  example: ExampleToEditType;
  @Field(() => ParadigmaticInfoToEditType, { nullable: true })
  paradigmaticInfo: ParadigmaticInfoToEditType;
}

@InputType()
export class NewUFtype {
  @Field()
  UF: string;
  @Field(() => String)
  ubication: string;
  @Field(() => GeneralDescriptorInputType, { nullable: true })
  generalDescription: GeneralDescriptorInputType;
  @Field(() => [UseInformationInputType], { nullable: true })
  useInformation: UseInformationInputType[];
  @Field(() => OrderLemmaInputType, { nullable: true })
  orderLemma: OrderLemmaInputType;
  @Field(() => [ContornoDefinitionInputType], { nullable: true })
  ContornoDefinition: ContornoDefinitionInputType[];
  @Field(() => ExampleInputType, { nullable: true })
  example: ExampleInputType;
  @Field(() => ParadigmaticInfoInputType, { nullable: true })
  paradigmaticInfo: ParadigmaticInfoInputType;
}

@InputType()
export class EditedUFType {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field()
  UF: string;
  @Field(() => String)
  ubication: string;
  @Field(() => EditedGeneralDescriptorType, { nullable: true })
  generalDescription: EditedGeneralDescriptorType;
  @Field(() => [EditedUseInformationType], { nullable: true })
  useInformation: EditedUseInformationType[];
  @Field(() => EditedOrderLemmaType, { nullable: true })
  orderLemma: EditedOrderLemmaType;
  @Field(() => [EditedContornoDefinitionType], { nullable: true })
  ContornoDefinition: EditedContornoDefinitionType[];
  @Field(() => EditedExampleType, { nullable: true })
  example: EditedExampleType;
  @Field(() => EditedParadigmaticInfoType, { nullable: true })
  paradigmaticInfo: EditedParadigmaticInfoType;
}
