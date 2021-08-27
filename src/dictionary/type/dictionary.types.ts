import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { EntryType, NewEntryType } from 'src/entry/type/entry.type';
import { DictionaryInfotype } from 'src/dictionaryInfo/type/dictionaryInfo.type';

@ObjectType()
export class DictionaryType {
  @Field(() => ID)
  id?: string;
  @Field()
  dictionaryInfo: DictionaryInfotype;
  @Field(() => [String])
  letters: [string];
  @Field(() => [EntryType])
  entries: EntryType[];
}

@ObjectType()
export class DictionaryEntriesAsStringType {
  @Field(() => ID)
  id?: string;
  @Field()
  dictionaryInfo: DictionaryInfotype;
  @Field(() => [String])
  letters: [string];
  @Field(() => [String])
  entries: string[];
}

@ObjectType()
export class DictionaryToEditType {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field()
  dictionaryInfo: string;
  @Field(() => [String])
  letters: [string];
  @Field(() => [String], { nullable: true })
  entries: [string];
}

@InputType()
export class NewDictionaryType {
  @Field()
  dictionaryInfo: string;
  @Field(() => [String])
  letters: [string];
  @Field(() => [String], { nullable: true })
  entries: [string];
}

@InputType()
export class EditedDictionaryType {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field()
  dictionaryInfo: string;
  @Field(() => [String])
  letters: [string];
  @Field(() => [String], { nullable: true })
  entries: [string];
}
