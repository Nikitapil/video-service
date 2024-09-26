import { Resolver, Mutation, Args, Context, Query, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { RegisterResponse } from '../auth/types/RegisterResponse';
import { RegisterDto } from '../auth/dto/register.dto';
import { Request, Response } from 'express';
import { LoginDto } from '../auth/dto/login.dto';
import { LoginResponse } from '../auth/types/LoginResponse';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GraphQlErrorFilter } from '../filters/custom-exception.filter';
import { User } from './models/user.model';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';
import { RefreshType } from '../auth/types/RefreshType';
import { GetUsersDto } from './dto/get-users.dto';

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

  @Mutation(() => RefreshType)
  refreshToken(
    @Context() context: { res: Response; req: Request }
  ): Promise<RefreshType> {
    return this.authService.refreshToken(context.req, context.res);
  }

  @Query(() => [User])
  getUsers(
    @Args('getUsersInput', { type: () => GetUsersDto, nullable: true })
    getUsersDto?: GetUsersDto
  ) {
    return this.userService.getUsers(getUsersDto);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Context() context: { req: Request },
    @Args('fullname', { type: () => String, nullable: true }) fullname?: string,
    @Args('bio', { type: () => String, nullable: true }) bio?: string,
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    image?: FileUpload
  ) {
    let imageUrl;
    if (image) {
      imageUrl = await this.userService.storeImageAndGetUrl(image);
    }

    return this.userService.updateProfile(context.req.user.sub, {
      fullname,
      bio,
      image: imageUrl
    });
  }
}
