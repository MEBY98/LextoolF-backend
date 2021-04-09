import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    email: string;
    name: string;
    password: string;
}

@InputType()
export class UpdateUserInput {
    name?: string;
    imgProfile?: string;
}



@ObjectType()
export class User {
    @Field(type => ID)
    _id: string;
    email: string;
    name: string;
    description?: string;
    imgProfile?: string;
}
