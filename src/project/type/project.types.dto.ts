import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ProjectType {
  @Field(() => ID)
  readonly id?: string;
  @Field()
  readonly name: string;
  @Field((type) => [String])
  readonly letters: [string]
}

@InputType()
export class NewProjectType {
  @Field()
  readonly name: string
  @Field((type) => [String])
  readonly letters: [string];
}

