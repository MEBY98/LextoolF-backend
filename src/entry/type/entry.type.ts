import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import {
  ElementType,
  ElementToEditType,
  NewElementType,
  EditedElementType,
  ElementDescriptorsAsStringType,
} from 'src/element/type/element.type';

@ObjectType()
export class EntryType {
  @Field(() => ID)
  id: string;
  @Field()
  letter: string;
  @Field(() => [String])
  context: string[];
  @Field(() => [ElementDescriptorsAsStringType], { nullable: true })
  elements: ElementDescriptorsAsStringType[];
}

@ObjectType()
export class EntryToEditType {
  @Field(() => ID)
  id: string;
  @Field()
  letter: string;
  @Field(() => [String])
  context: string[];
  @Field(() => [ElementToEditType], { nullable: true })
  elements: ElementToEditType[];
}

@InputType()
export class NewEntryType {
  @Field()
  letter: string;
  @Field(() => [String])
  context: string[];
  @Field(() => [NewElementType], { nullable: true })
  elements: NewElementType[];
}

@InputType()
export class EditedEntryType {
  @Field(() => ID)
  id: string;
  @Field()
  letter: string;
  @Field(() => [String])
  context: string[];
  @Field(() => [EditedElementType], { nullable: true })
  elements: EditedElementType[];
}
