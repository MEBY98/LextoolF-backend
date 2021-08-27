import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Authortype {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  siglas: string;
}

@ObjectType()
export class AuthorToEditType {
  @Field(() => ID, { nullable: true })
  id: string;
  @Field()
  name: string;
  @Field()
  siglas: string;
}

@InputType()
export class NewAuthortype {
  @Field()
  name: string;
  @Field()
  siglas: string;
}

@InputType()
export class EditedAuthorType {
  @Field(() => ID, { nullable: true })
  id: string;
  @Field()
  name: string;
  @Field()
  siglas: string;
}
