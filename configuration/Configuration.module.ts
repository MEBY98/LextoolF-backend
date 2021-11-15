import { Module } from '@nestjs/common';
import { ConfigurationService } from './Configuration.service';

@Module({
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
