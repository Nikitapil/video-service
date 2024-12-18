import { Module } from '@nestjs/common';
import { SettingsResolver } from './settings.resolver';
import { SettingsService } from './settings.service';

@Module({
  providers: [SettingsResolver, SettingsService]
})
export class SettingsModule {}
