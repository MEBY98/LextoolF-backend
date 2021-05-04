import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';

@ObjectType()
export class DescriptorType {
  @Field(() => ID)
  readonly id?: string;
  @Field()
  readonly projectID: string;
  @Field()
  readonly description: string;
  @Field()
  readonly father: string;
  @Field()
  readonly type: string;
  @Field()
  readonly reference: string;
  @Field((type) => [DescriptorType])
  readonly descriptorsChild: [DescriptorType]
}

@ObjectType()
export class CreatedDescriptorType {
  @Field(() => ID)
  readonly id?: string;
  @Field()
  readonly projectID: string;
  @Field()
  readonly description: string;
  @Field({nullable:true})
  readonly father: string;
  @Field({nullable:true})
  readonly type: String;
  @Field({nullable:true})
  readonly reference: string;
}

@InputType()
export class NewDescriptorType {
  @Field()
  readonly description: string
  @Field({nullable:true})
  readonly type: string;
  @Field({nullable:true})
  readonly father: string;
  @Field({nullable:true})
  readonly reference: string;
  @Field()
  readonly projectID: string;
}
