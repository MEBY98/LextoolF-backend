import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { Clasificationtype } from 'src/clasification/type/clasification.type';

@ObjectType()
export class Lemmatype {
  @Field(() => ID)
  id: string;
  @Field()
  lemma: string;
  @Field(() => Clasificationtype)
  clasification: Clasificationtype;
}

@ObjectType()
export class LemmaToEditType {
  @Field(() => ID)
  id: string;
  @Field()
  lemma: string;
  @Field(() => String)
  clasification: string;
}

@InputType()
export class NewLemmatype {
  @Field()
  lemma: string;
  @Field(() => String)
  clasification: string;
}

@InputType()
export class EditedLemmaType {
  @Field(() => ID, { nullable: true })
  id: string;
  @Field()
  lemma: string;
  @Field(() => String)
  clasification: string;
}
