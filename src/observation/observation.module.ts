import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DescriptorTypeModule } from 'src/descriptorType/descriptorType.module';
import { ObservationSchema } from './model/observation.model';
import { ObservationService } from './observation.service';
import { ObservationResolver } from './observation.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Observation', schema: ObservationSchema },
    ]),
    DescriptorTypeModule,
  ],
  providers: [ObservationService, ObservationResolver],
  exports: [ObservationService, ObservationResolver],
})
export class ObservationModule {}
