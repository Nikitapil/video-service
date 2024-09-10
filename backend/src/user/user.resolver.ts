import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { RegisterResponse } from '../auth/types/RegisterResponse';
import { RegisterDto } from '../auth/dto/register.dto';
import { Request, Response } from 'express';
import { LoginDto } from '../auth/dto/login.dto';
import { LoginResponse } from '../auth/types/LoginResponse';
import { UseFilters } from '@nestjs/common';
import { GraphQlErrorFilter } from '../filters/custom-exception.filter';
import { User } from './models/user.model';

@UseFilters(GraphQlErrorFilter)
@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Mutation(() => RegisterResponse)
  register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response }
  ): Promise<RegisterResponse> {
    return this.authService.register(registerDto, context.res);
  }

  @Mutation(() => LoginResponse)
  login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() context: { res: Response }
  ): Promise<LoginResponse> {
    return this.authService.login(loginDto, context.res);
  }

  @Mutation(() => String)
  logout(@Context() context: { res: Response }): Promise<string> {
    return this.authService.logout(context.res);
  }

  @Mutation(() => String)
  refreshToken(
    @Context() context: { res: Response; req: Request }
  ): Promise<string> {
    return this.authService.refreshToken(context.req, context.res);
  }

  @Query(() => [User])
  getUsers() {
    return this.userService.getUsers();
  }
}
