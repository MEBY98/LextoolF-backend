import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DescriptorSchema } from './model/descriptor.model';
import { DescriptorService } from './descriptor.service';
import { DescriptorResolver } from './descriptor.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Descriptor', schema: DescriptorSchema },
    ]),
  ],
  providers: [DescriptorService, DescriptorResolver],
  exports: [DescriptorService, DescriptorResolver],
})
export class DescriptorModule {}
