import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class DescriptorType {
  @Field(() => ID, { nullable: true })
  readonly id?: string;
  @Field({ nullable: true })
  readonly description: string;
}

@InputType()
export class DescriptorInputType {
  @Field(() => ID, { nullable: true })
  readonly id?: string;
  @Field({ nullable: true })
  readonly description: string;
}
@InputType()
export class NewDescriptorType {
  @Field()
  readonly description: string;
}
