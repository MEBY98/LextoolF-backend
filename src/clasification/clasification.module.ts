import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClasificationSchema } from './model/clasification.model';
import { ClasificationResolver } from './clasification.resolver';
import { ClasificationService } from './clasification.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Clasification', schema: ClasificationSchema },
    ]),
  ],
  providers: [ClasificationService, ClasificationResolver],
  exports: [ClasificationService, ClasificationResolver],
})
export class ClasificationModule {}
