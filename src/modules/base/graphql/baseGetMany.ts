import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Pagination } from '../../shared/graphql/shared.schema';
import { pluralize } from '../../shared/utils/utils';
import { Json } from './../../shared/graphql/scalars/json.scalar';

export function baseGetMany(objectType): Function {
    @ObjectType(`Many${pluralize(objectType.name)}`)
    class ManyResult {
        @Field(type => Pagination)
        pagination: Pagination;

        @Field(type => [objectType])
        elements: [typeof objectType]
    }

    return ManyResult
}


@ObjectType()
export class ListType {
    @Field(type => ID)
    _id: string

    @Field()
    text: string;

    @Field({ nullable: true })
    descriptiveText: string;

    @Field(type => Json, { nullable: true, })
    object: object;
}
