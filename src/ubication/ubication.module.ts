import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UbicationSchema } from './model/ubication.model';
import { UbicationResolver } from './ubication.resolver';
import { UbicationService } from './ubication.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ubication', schema: UbicationSchema }]),
  ],
  providers: [UbicationService, UbicationResolver],
  exports: [UbicationService, UbicationResolver],
})
export class UbicationModule {}
