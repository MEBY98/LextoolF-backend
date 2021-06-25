import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
// import { DescriptorWithoutChildsType } from 'src/descriptor/type/descriptor.types.dto';

@ObjectType()
export class UFtype {
  @Field(() => ID)
  id: String;
  @Field()
  UF: String;
  // @Field(() => [DescriptorWithoutChildsType])
  // clasifications: [DescriptorWithoutChildsType];
}

@InputType()
export class NewUFtype {
  @Field()
  UF: String;
  @Field(() => [String])
  clasifications: String[];
}
