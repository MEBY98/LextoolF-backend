import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UFModule } from 'src/UF/UF.module';
import { LemmaSchema } from './model/lemma.model';
import { LemmaService } from './lemma.service';
import { LemmaResolver } from './lemma.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lemma', schema: LemmaSchema }]),
    UFModule,
  ],
  providers: [LemmaService, LemmaResolver],
  exports: [LemmaService, LemmaResolver],
})
export class LemmaModule {}
