import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Ubicationtype {
  @Field(() => ID)
  id?: string;
  @Field(() => String)
  ubication: string;
}

@InputType()
export class NewUbicationtype {
  @Field(() => String)
  ubication: string;
}
