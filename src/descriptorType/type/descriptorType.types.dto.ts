import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import {
  DescriptorType,
  NewDescriptorType,
} from 'src/descriptor/type/descriptor.types.dto';

@ObjectType()
export class DescriptorTypeType {
  @Field(() => ID)
  id?: string;
  @Field()
  name: string;
  @Field({ nullable: true })
  tab: string;
  @Field(() => [DescriptorType])
  descriptors: DescriptorType[];
  @Field(() => String)
  inputType: string;
  @Field(() => Boolean)
  multiInput: boolean;
}

@InputType()
export class NewDescriptorTypeType {
  @Field()
  name: string;
  @Field({ nullable: true })
  tab: string;
  @Field(() => [NewDescriptorType], { nullable: true })
  descriptors: NewDescriptorType[];
  @Field(() => String)
  inputType: string;
  @Field(() => Boolean, { nullable: true })
  multiInput: boolean;
}
