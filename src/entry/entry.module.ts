import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntrySchema } from './model/entry.model';
import { EntryService } from './entry.service';
import { EntryResolver } from './entry.resolver';
import { UFModule } from 'src/UF/UF.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Entry', schema: EntrySchema }]),
    UFModule,
  ],
  providers: [EntryService, EntryResolver],
  exports: [EntryService, EntryResolver],
})
export class EntryModule {}
