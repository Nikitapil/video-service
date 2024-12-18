import { Query, Resolver } from '@nestjs/graphql';
import { SettingsType } from './types/settings.type';
import { SettingsService } from './settings.service';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';
import { User } from '../decorators/User.decorator';
import { TokenUserDto } from '../auth/dto/TokenUser.dto';

@UseGuards(GraphQLAuthGuard)
@Resolver()
export class SettingsResolver {
  constructor(private readonly settingsService: SettingsService) {}

  @Query(() => SettingsType)
  getSettings(@User() user: TokenUserDto): Promise<SettingsType> {
    return this.settingsService.getSettings(user.sub);
  }
}
