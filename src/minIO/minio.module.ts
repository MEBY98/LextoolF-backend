import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { MinioController } from './minio.controller';
import { MinioService } from './minio.service';
import { DescriptorModule } from 'src/descriptor/descriptor.module';
import { ClasificationModule } from 'src/clasification/clasification.module';
import { UbicationModule } from 'src/ubication/ubication.module';
import { DictionaryModule } from 'src/dictionary/dictionary.module';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    DictionaryModule,
    DescriptorModule,
    ClasificationModule,
    UbicationModule,
  ],
  controllers: [MinioController],
  providers: [MinioService],
  exports: [MinioService],
})
export class MinioModule {}
