import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { Authortype } from 'src/author/type/author.type';

@ObjectType()
export class DictionaryInfotype {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  siglas: string;
  @Field(() => [Authortype])
  author: Authortype[];
  @Field()
  annoOfPublication: number;
  @Field()
  reference: string;
}

@ObjectType()
export class DictionaryInfoToEdittype {
  @Field(() => ID, { nullable: true })
  id: string;
  @Field()
  name: string;
  @Field()
  siglas: string;
  @Field(() => [String])
  author: string[];
  @Field()
  annoOfPublication: number;
  @Field()
  reference: string;
}

@InputType()
export class NewDictionaryInfotype {
  @Field()
  name: string;
  @Field()
  siglas: string;
  @Field(() => [String])
  author: string[];
  @Field()
  annoOfPublication: number;
  @Field()
  reference: string;
}

@InputType()
export class EditedDictionaryInfotype {
  @Field(() => ID, { nullable: true })
  id: string;
  @Field()
  name: string;
  @Field()
  siglas: string;
  @Field(() => [String])
  author: string[];
  @Field()
  annoOfPublication: number;
  @Field()
  reference: string;
}
