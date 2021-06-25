import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';

@InputType()
export class NewAuthorType {
  @Field()
  name: String;
  @Field()
  siglas: String;
}

@ObjectType()
export class AuthorType {
  @Field()
  name: String;
  @Field()
  siglas: String;
}
