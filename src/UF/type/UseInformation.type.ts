import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { DescriptorType } from 'src/descriptor/type/descriptor.types.dto';

@ObjectType()
export class UseInformationObjectType {
  @Field({ nullable: true })
  anotation: string;
  @Field(() => [DescriptorType], { nullable: true })
  descriptors: [DescriptorType];
}

@ObjectType()
export class UseInformationToEditType {
  @Field({ nullable: true })
  anotation: string;
  @Field(() => [String], { nullable: true })
  descriptors: string[];
}

@InputType()
export class UseInformationInputType {
  @Field({ nullable: true })
  anotation: string;
  @Field(() => [String], { nullable: true })
  descriptors: string[];
}

@InputType()
export class EditedUseInformationType {
  @Field({ nullable: true })
  anotation: string;
  @Field(() => [String], { nullable: true })
  descriptors: string[];
}
