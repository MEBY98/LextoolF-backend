import { Field, ID, ObjectType } from '@nestjs/graphql';

export interface BaseObject {
    id: string
}

@ObjectType()
export class BaseType {
    @Field(type => ID)
    _id: string;

    @Field()
    createdAt: string

    @Field()
    updatedAt: string
}
