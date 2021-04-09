import { Field, ID, InputType, ObjectType, PartialType } from '@nestjs/graphql';

import { baseGetMany } from './../../../../base/graphql/baseGetMany';

// Generated by GENERATOR: 11/29/2020, 12:23:56 PM

@InputType()
export class CreateElementInput {
    name: string
}

@InputType()
export class UpdateElementInput extends PartialType(CreateElementInput) {
    @Field(type => ID)
    _id: string;
}

@ObjectType()
export class Element {
    @Field(type => ID)
    _id: string;
    name: string
}

@ObjectType()
export class ElementTemplate {
    @Field(type => ID)
    _id: string;
    required: boolean
    element: string
}

@InputType()
export class ElementInput {
    @Field(type => ID)
    element: string;
    required: boolean
}


export const GetManyElements = baseGetMany(Element)
