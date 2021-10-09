import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import {
  NewDictionaryType,
  DictionaryToEditType,
  EditedDictionaryType,
  DictionaryEntriesAsStringType,
} from 'src/dictionary/type/dictionary.types';

@ObjectType()
export class FraseograficStudyType {
  @Field(() => ID)
  id?: string;
  @Field()
  name: string;
  @Field()
  initYear: number;
  @Field()
  finalYear: number;
  @Field()
  state: string;
  @Field(() => [DictionaryEntriesAsStringType], { nullable: true })
  dictionaries: [DictionaryEntriesAsStringType];
}

@ObjectType()
export class FraseograficStudyToEditType {
  @Field(() => ID)
  id?: string;
  @Field()
  name: string;
  @Field()
  initYear: number;
  @Field()
  finalYear: number;
  @Field()
  state: string;
  @Field(() => [DictionaryToEditType], { nullable: true })
  dictionaries: [DictionaryToEditType];
}

@InputType()
export class NewfraseograficStudyType {
  @Field()
  name: string;
  @Field()
  initYear: number;
  @Field()
  finalYear: number;
  @Field({ nullable: true })
  state: string;
  @Field(() => [NewDictionaryType], { nullable: true })
  dictionaries: NewDictionaryType[];
}

@InputType()
export class EditedfraseograficStudyType {
  @Field(() => ID)
  id?: string;
  @Field()
  name: string;
  @Field()
  initYear: number;
  @Field()
  finalYear: number;
  @Field({ nullable: true })
  state: string;
  @Field(() => [EditedDictionaryType], { nullable: true })
  dictionaries: EditedDictionaryType[];
}
