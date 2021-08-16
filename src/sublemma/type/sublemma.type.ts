import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { DescriptorType } from 'src/descriptor/type/descriptor.types.dto';
import { Clasificationtype } from 'src/clasification/type/clasification.type';

@ObjectType()
export class Sublemmatype {
  @Field(() => ID)
  id: string;
  @Field()
  sublemma: string;
  @Field(() => Clasificationtype)
  clasification: Clasificationtype;
}

@ObjectType()
export class SublemmaToEdittype {
  @Field(() => ID)
  id: string;
  @Field()
  sublemma: string;
  @Field(() => String)
  clasification: string;
}

@InputType()
export class NewSublemmatype {
  @Field()
  sublemma: string;
  @Field(() => String)
  clasification: string;
}

@InputType()
export class EditedSublemmaType {
  @Field(() => ID, { nullable: true })
  id: string;
  @Field()
  sublemma: string;
  @Field(() => String)
  clasification: string;
}
