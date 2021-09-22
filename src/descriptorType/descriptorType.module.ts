import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DescriptorTypeService } from './descriptorType.service';
import { DescriptorTypeResolver } from './descriptorType.resolver';
import { DescriptorTypeSchema } from './model/descriptorType.model';
import { DescriptorModule } from 'src/descriptor/descriptor.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DescriptorType', schema: DescriptorTypeSchema },
    ]),
    DescriptorModule,
  ],
  providers: [DescriptorTypeService, DescriptorTypeResolver],
  exports: [DescriptorTypeService, DescriptorTypeResolver, DescriptorModule],
})
export class DescriptorTypeModule {}
