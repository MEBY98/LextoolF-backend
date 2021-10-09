import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { DescriptorType } from 'src/descriptor/type/descriptor.types.dto';

//UseInformation
@ObjectType()
export class UseInformationObjectType {
  @Field({ nullable: true })
  anotation: string;
  @Field({ nullable: true })
  position: DescriptorType;
  @Field({ nullable: true })
  format: DescriptorType;
  @Field({ nullable: true })
  tipography: DescriptorType;
}

@ObjectType()
export class UseInformationToEditType {
  @Field({ nullable: true })
  anotation: string;
  @Field({ nullable: true })
  position: string;
  @Field({ nullable: true })
  format: string;
  @Field({ nullable: true })
  tipography: string;
}

@InputType()
export class UseInformationInputType {
  @Field({ nullable: true })
  anotation: string;
  @Field({ nullable: true })
  position: string;
  @Field({ nullable: true })
  format: string;
  @Field({ nullable: true })
  tipography: string;
}

@InputType()
export class EditedUseInformationType {
  @Field({ nullable: true })
  anotation: string;
  @Field({ nullable: true })
  position: string;
  @Field({ nullable: true })
  format: string;
  @Field({ nullable: true })
  tipography: string;
}
