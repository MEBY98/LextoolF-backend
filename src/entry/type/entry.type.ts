import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { UFtype, NewUFtype } from '../../UF/type/UF.type';

@ObjectType()
export class EntryType {
  @Field(() => ID)
  id: String;
  @Field()
  letter: String;
  @Field()
  context: String;
  @Field({ nullable: true })
  lemma: String;
  @Field(() => [UFtype])
  UFs: UFtype[];
}

@ObjectType()
export class CreatedEntryType {
  @Field(() => ID)
  id?: String;
  @Field()
  letter: String;
  @Field()
  context: String;
  @Field({ nullable: true })
  lemma: String;
  @Field(() => [UFtype])
  UFs: UFtype[];
}

@InputType()
export class NewEntryType {
  @Field()
  letter: String;
  @Field()
  context: String;
  @Field({ nullable: true })
  lemma: String;
  @Field(() => [NewUFtype], { nullable: true })
  UFs: NewUFtype[];
}
