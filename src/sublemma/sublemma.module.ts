import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UFModule } from 'src/UF/UF.module';
import { SublemmaSchema } from './model/sublemma.model';
import { SublemmaService } from './sublemma.service';
import { SublemmaResolver } from './sublemma.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Sublemma', schema: SublemmaSchema }]),
    UFModule,
  ],
  providers: [SublemmaService, SublemmaResolver],
  exports: [SublemmaService, SublemmaResolver],
})
export class SublemmaModule {}
