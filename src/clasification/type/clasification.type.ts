import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Clasificationtype {
  @Field(() => ID)
  id?: string;
  @Field()
  clasification: string;
}

@InputType()
export class NewClasificationtype {
  @Field()
  clasification: string;
}
