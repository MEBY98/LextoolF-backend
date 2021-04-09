import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from '../../user/graphql/user.schema';
import { UserDto } from '../../user/models/user.dto';
import { AuthService } from '../auth.service';
import { Json } from './../../shared/graphql/scalars/json.scalar';
import { GetUser } from './../decorators/user.decorator';
import { LoginInputDto } from './../dto/LoginInput.dto';
import { GqlAuthGuard } from './../guards/graphqlAuth.guard';
import { RefreshToken, UserToken } from './auth.schema';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Mutation(returns => Json)
  async registerUser(@Args('input', { type: () => CreateUserInput }) input: CreateUserInput) {
    await new UserDto(input).validateCreateWithException()
    return this.authService.registerUser(input);
  }

  @Query(returns => UserToken)
  async login(@Args('input', { type: () => LoginInputDto }) input): Promise<any> {
    return this.authService.loginUser(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => RefreshToken)
  async refreshToken(@GetUser() user): Promise<any> {
    return await this.authService.loginUserFromToken(user)
  }
}
