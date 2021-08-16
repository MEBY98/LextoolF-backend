import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import {
  DescriptorTypeType,
  NewDescriptorTypeType,
} from 'src/descriptorType/type/descriptorType.types.dto';

@ObjectType()
export class ObservationType {
  @Field(() => ID)
  readonly id?: string;
  @Field()
  readonly name: string;
  @Field()
  readonly tab: string;
  @Field(() => [DescriptorTypeType])
  readonly descriptorsTypes: DescriptorTypeType[];
}

@InputType()
export class NewObservationType {
  @Field()
  readonly name: string;
  @Field()
  readonly tab: string;
  @Field(() => [NewDescriptorTypeType])
  readonly descriptorsTypes: NewDescriptorTypeType[];
}
