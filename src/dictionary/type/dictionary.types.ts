import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { fraseograficStudyType } from 'src/fraseograficStudy/type/fraseograficStudy.types';
import { EntryType } from 'src/entry/type/entry.type';
import { AuthorType, NewAuthorType } from './author.type';

@ObjectType()
export class DictionaryType {
  @Field(() => ID)
  id?: String;
  @Field()
  name: String;
  @Field()
  shortName: String;
  @Field(() => [AuthorType])
  author: [AuthorType];
  @Field()
  annoOfPublication: number;
  @Field()
  reference: String;
  @Field(() => [String])
  letters: [String];
  @Field(() => [EntryType])
  entries: EntryType[];
}

@ObjectType()
export class DictionaryTypeWithoutEntries {
  @Field(() => ID)
  id?: String;
  @Field()
  name: String;
  @Field()
  shortName: String;
  @Field(() => [AuthorType])
  author: [AuthorType];
  @Field()
  annoOfPublication: number;
  @Field()
  reference: String;
  @Field(() => [String])
  letters: [String];
}

@ObjectType()
export class CreatedDictionaryType {
  @Field(() => ID)
  id?: String;
  @Field()
  name: String;
  @Field()
  shortName: String;
  @Field(() => [AuthorType])
  author: [AuthorType];
  @Field()
  annoOfPublication: number;
  @Field()
  reference: String;
  @Field(() => [String])
  letters: [String];
}

@InputType()
export class NewDictionaryType {
  @Field()
  name: String;
  @Field()
  shortName: String;
  @Field(() => [NewAuthorType])
  author: [NewAuthorType];
  @Field()
  annoOfPublication: number;
  @Field()
  reference: String;
  @Field(() => [String])
  letters: [String];
}

@InputType()
export class EditDictionaryTypeWithoutEntries {
  @Field(() => ID, { nullable: true })
  id?: String;
  @Field()
  name: String;
  @Field()
  shortName: String;
  @Field(() => [NewAuthorType])
  author: [NewAuthorType];
  @Field()
  annoOfPublication: number;
  @Field()
  reference: String;
  @Field(() => [String])
  letters: [String];
}
