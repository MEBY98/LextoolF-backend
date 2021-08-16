import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { EntryType, NewEntryType } from 'src/entry/type/entry.type';
import { AuthorType, NewAuthorType } from './author.type';

@ObjectType()
export class DictionaryType {
  @Field(() => ID)
  id?: string;
  @Field()
  name: string;
  @Field()
  shortName: string;
  @Field(() => [AuthorType])
  author: [AuthorType];
  @Field()
  annoOfPublication: number;
  @Field()
  reference: string;
  @Field(() => [String])
  letters: [string];
  @Field(() => [EntryType])
  entries: EntryType[];
}

@ObjectType()
export class EditDictionaryObjectType {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field()
  name: string;
  @Field()
  shortName: string;
  @Field(() => [AuthorType])
  author: [AuthorType];
  @Field()
  annoOfPublication: number;
  @Field()
  reference: string;
  @Field(() => [String])
  letters: [string];
  @Field(() => [String], { nullable: true })
  entries: [string];
}

@InputType()
export class NewDictionaryType {
  @Field()
  name: string;
  @Field()
  shortName: string;
  @Field(() => [NewAuthorType])
  author: [NewAuthorType];
  @Field()
  annoOfPublication: number;
  @Field()
  reference: string;
  @Field(() => [String])
  letters: [string];
  @Field(() => [String], { nullable: true })
  entries: [string];
}

@InputType()
export class EditDictionaryInputType {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field()
  name: string;
  @Field()
  shortName: string;
  @Field(() => [NewAuthorType])
  author: [NewAuthorType];
  @Field()
  annoOfPublication: number;
  @Field()
  reference: string;
  @Field(() => [String])
  letters: [string];
  @Field(() => [String], { nullable: true })
  entries: [string];
}
