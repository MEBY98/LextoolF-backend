import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { DescriptorType } from 'src/descriptor/type/descriptor.types.dto';

@ObjectType()
export class GeneralDescriptionObjectType {
  @Field({ nullable: true })
  tipo: DescriptorType;
  @Field(() => DescriptorType, { nullable: true })
  structure: DescriptorType;
  @Field(() => DescriptorType, { nullable: true })
  conceptualDomain: DescriptorType;
}

@ObjectType()
export class GeneralDescriptionToEditType {
  @Field({ nullable: true })
  tipo: string;
  @Field({ nullable: true })
  structure: string;
  @Field({ nullable: true })
  conceptualDomain: string;
}

@InputType()
export class GeneralDescriptionInputType {
  @Field({ nullable: true })
  tipo: string;
  @Field({ nullable: true })
  structure: string;
  @Field({ nullable: true })
  conceptualDomain: string;
}

@InputType()
export class EditedGeneralDescriptionType {
  @Field({ nullable: true })
  tipo: string;
  @Field({ nullable: true })
  structure: string;
  @Field({ nullable: true })
  conceptualDomain: string;
}
