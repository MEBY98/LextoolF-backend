import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import {
  UFtype,
  NewUFtype,
  UFToEditType,
  EditedUFType,
} from '../../UF/type/UF.type';
import {
  Sublemmatype,
  NewSublemmatype,
  SublemmaToEdittype,
  EditedSublemmaType,
} from 'src/sublemma/type/sublemma.type';
import {
  Lemmatype,
  NewLemmatype,
  LemmaToEditType,
  EditedLemmaType,
} from 'src/lemma/type/lemma.type';

@ObjectType()
export class EntryType {
  @Field(() => ID)
  id: string;
  @Field()
  letter: string;
  @Field(() => [String])
  context: string[];
  @Field(() => Lemmatype, { nullable: true })
  lemma: Lemmatype;
  @Field(() => [Sublemmatype])
  sublemmas: Sublemmatype[];
  @Field(() => [UFtype])
  UFs: UFtype[];
}

@ObjectType()
export class EntryToEditType {
  @Field(() => ID)
  id: string;
  @Field()
  letter: string;
  @Field(() => [String])
  context: string[];
  @Field(() => LemmaToEditType, { nullable: true })
  lemma: LemmaToEditType;
  @Field(() => [SublemmaToEdittype], { nullable: true })
  sublemmas: SublemmaToEdittype[];
  @Field(() => [UFToEditType])
  UFs: UFToEditType[];
}

@InputType()
export class NewEntryType {
  @Field()
  letter: string;
  @Field(() => [String])
  context: string[];
  @Field(() => NewLemmatype, { nullable: true })
  lemma: NewLemmatype;
  @Field(() => [NewSublemmatype])
  sublemmas: [NewSublemmatype];
  @Field(() => [NewUFtype])
  UFs: [NewUFtype];
}

@InputType()
export class EditedEntryType {
  @Field(() => ID)
  id: string;
  @Field()
  letter: string;
  @Field(() => [String])
  context: string[];
  @Field(() => EditedLemmaType, { nullable: true })
  lemma: EditedLemmaType;
  @Field(() => [EditedSublemmaType], { nullable: true })
  sublemmas: EditedSublemmaType[];
  @Field(() => [EditedUFType])
  UFs: EditedUFType[];
}
