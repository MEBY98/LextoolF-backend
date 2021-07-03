import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UFSchema } from './model/UF.model';
import { DescriptorModule } from 'src/descriptor/descriptor.module';
import { UFResolver } from './UF.resolver';
import { UFService } from './UF.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UF', schema: UFSchema }]),
    DescriptorModule,
  ],
  providers: [UFResolver, UFService],
  exports: [UFResolver, UFService],
})
export class UFModule {}