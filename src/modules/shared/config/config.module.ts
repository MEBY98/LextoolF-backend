import { ConfigService } from './config.service';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigModule { }
