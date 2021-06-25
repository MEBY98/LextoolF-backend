import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import {
  DictionaryType,
  NewDictionaryType,
  DictionaryTypeWithoutEntries,
  EditDictionaryTypeWithoutEntries,
} from 'src/dictionary/type/dictionary.types';

@ObjectType()
export class fraseograficStudyType {
  @Field(() => ID)
  id?: string;
  @Field()
  name: string;
  @Field()
  shortName: string;
  @Field()
  period: string;
  @Field(type => [DictionaryTypeWithoutEntries])
  dictionaries: [DictionaryTypeWithoutEntries];
}

@ObjectType()
export class CreatedfraseograficStudyType {
  @Field(() => ID)
  id?: string;
  @Field()
  name: string;
  @Field()
  shortName: string;
  @Field()
  period: string;
  @Field(type => [String])
  dictionaries: String[];
}

@InputType()
export class NewfraseograficStudyType {
  @Field()
  readonly name: string;
  @Field()
  readonly shortName: string;
  @Field(type => [NewDictionaryType], { nullable: true })
  readonly dictionaries: NewDictionaryType[];
}

@InputType()
export class EditfraseograficStudyType {
  @Field(() => ID)
  id?: string;
  @Field()
  name: string;
  @Field()
  shortName: string;
  @Field()
  period: string;
  @Field(type => [EditDictionaryTypeWithoutEntries])
  dictionaries: [EditDictionaryTypeWithoutEntries];
}
