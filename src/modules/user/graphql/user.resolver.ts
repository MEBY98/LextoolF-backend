import { Resolver } from '@nestjs/graphql';

import { User } from './user.schema';

@Resolver(of => User)
export class UserResolver { }
