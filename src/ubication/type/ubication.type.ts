import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { Clasificationtype } from 'src/clasification/type/clasification.type';

@ObjectType()
export class Ubicationtype {
  @Field(() => ID)
  id?: string;
  @Field(() => String)
  ubication: string;
  @Field(() => [Clasificationtype])
  clasifications: Clasificationtype[];
}

@InputType()
export class NewUbicationtype {
  @Field(() => String)
  ubication: string;
  @Field(() => [String])
  clasifications: string[];
}
