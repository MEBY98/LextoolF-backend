import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';

@InputType()
export class NewAuthorType {
  @Field()
  name: string;
  @Field()
  siglas: string;
}

@ObjectType()
export class AuthorType {
  @Field()
  name: string;
  @Field()
  siglas: string;
}
