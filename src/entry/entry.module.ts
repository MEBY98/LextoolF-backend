import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntrySchema } from './model/entry.model';
import { EntryService } from './entry.service';
import { EntryResolver } from './entry.resolver';
// import { LemmaModule } from 'src/lemma/lemma.module';
// import { SublemmaModule } from 'src/sublemma/sublemma.module';
// import { UFModule } from 'src/UF/UF.module';
import { ElementModule } from 'src/element/element.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Entry', schema: EntrySchema }]),
    ElementModule,
  ],
  providers: [EntryService, EntryResolver],
  exports: [EntryService, EntryResolver],
})
export class EntryModule {}
