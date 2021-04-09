import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { Json } from './scalars/json.scalar';

@InputType()
export class PaginationInput {
    page?: number
    limit?: number
    skip?: number
    startingAfter?: string
}


@ObjectType()
export class Pagination {
    totalElements: number
    hasNextPage: boolean
    lastPage: number
    nextPage: number
    previousPage: number
}

@InputType()
class Options {

    limit: number
}

@InputType()
export class AddressInput {
    @Field()
    provinceId: string
    townId: string
    direction: string
}

@InputType({})
export class Populate {
    @Field()
    path: string

    @Field()
    select?: string

    @Field()
    model?: string

    @Field(type => Json)
    match?: object

    @Field(type => Options)
    options?: Options

    // TODO: Find a way to recursive include input in the same input
    // @Field(type => Populate)
    // populate?: Populate
}


@InputType()
export class Params {
    @Field(type => Json)
    where?: object

    @Field(type => [Populate])
    populate?: Populate[]

    @Field(type => [Json])
    aggregate?: object[]

    @Field()
    select?: string

    @Field()
    distinct?: string

    @Field()
    sort?: string
}


@InputType()
export class GetManyInput {
    @Field(type => PaginationInput)
    paginationInput?: PaginationInput

    @Field(type => Params)
    params?: Params
}

@InputType()
export class GetOneInput {
    @Field(type => [Populate], { nullable: true })
    populate: Populate[]

    @Field({ nullable: true })
    select: string

    @Field(type => Json)
    where: object
}



@ObjectType()
export class DeleteManyResult {
    @Field()
    ok?: number  // 1 if no errors occurred

    @Field()
    deletedCount?: number  // the number of documents deleted

    @Field()
    n?: number  // the number of documents deleted. Equal to deletedCount.
}

@ObjectType()
export class UpdateManyResult {
    @Field(type => Int, { description: 'Number of documents matched' })
    n: number;

    @Field(type => Int, { description: 'Number of documents modified' })
    nModified: number;
}


@ObjectType()
export class ValidateResult {

    status: number

    @Field(type => Json)
    errors?: object
}
