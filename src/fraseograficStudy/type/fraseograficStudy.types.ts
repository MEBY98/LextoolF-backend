import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import {
  DictionaryType,
  NewDictionaryType,
  EditDictionaryObjectType,
  EditDictionaryInputType,
} from 'src/dictionary/type/dictionary.types';

@ObjectType()
export class FraseograficStudyType {
  @Field(() => ID)
  id?: string;
  @Field()
  name: string;
  @Field()
  period: string;
  @Field()
  state: string;
  @Field(() => [DictionaryType])
  dictionaries: [DictionaryType];
}

@ObjectType()
export class EditfraseograficStudyObjectType {
  @Field(() => ID)
  id?: string;
  @Field()
  name: string;
  @Field()
  period: string;
  @Field()
  state: string;
  @Field(() => [EditDictionaryObjectType])
  dictionaries: [EditDictionaryObjectType];
}

@InputType()
export class NewfraseograficStudyType {
  @Field()
  name: string;
  @Field()
  period: string;
  @Field({ nullable: true })
  state: string;
  @Field(() => [NewDictionaryType], { nullable: true })
  dictionaries: NewDictionaryType[];
}

@InputType()
export class EditfraseograficStudyType {
  @Field(() => ID)
  id?: string;
  @Field()
  name: string;
  @Field()
  period: string;
  @Field({ nullable: true })
  state: string;
  @Field(() => [EditDictionaryInputType], { nullable: true })
  dictionaries: EditDictionaryInputType[];
}
