import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/graphql/user.schema';

@ObjectType()
export class UserToken {
    @Field(type => User)
    user: User;

    token: string
    expiresIn: number
}


@ObjectType()
export class RefreshToken {
    @Field()
    refreshToken: string
    expiresIn: number
}
