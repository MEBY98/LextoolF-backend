import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ElementSchema } from './model/element.model';
import { ElementResolver } from './element.resolver';
import { ElementService } from './element.service';
import { UbicationModule } from 'src/ubication/ubication.module';
import { ClasificationModule } from 'src/clasification/clasification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Element', schema: ElementSchema }]),
    UbicationModule,
    ClasificationModule,
  ],
  providers: [ElementService, ElementResolver],
  exports: [ElementService, ElementResolver],
})
export class ElementModule {}
