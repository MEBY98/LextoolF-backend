import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { fraseograficStudySchema } from './model/fraseograficStudy.model';
import { FraseograficStudyService } from './fraseograficStudy.service';
import { FraseograficStudyResolver } from './fraseograficStudy.resolver';
import { DictionaryModule } from 'src/dictionary/dictionary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'fraseograficStudy', schema: fraseograficStudySchema },
      // { name: 'Dictionary', schema: DictionarySchema },
    ]),
    DictionaryModule,
  ],
  providers: [FraseograficStudyService, FraseograficStudyResolver],
})
export class FraseograficStudyModule {}
