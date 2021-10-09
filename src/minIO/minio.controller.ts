import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { MinioService } from './minio.service';
import path from 'path';
import fs from 'fs';

@Controller('files')
export class MinioController {
  constructor(private readonly service: MinioService) {}

  @Get('/:name')
  async getFile(@Param('name') name: string, @Res() res: Response) {
    const result = (await this.service.getFile(name)).pipe(res);
    return result;
  }

  @Get('/generateStudy/:studyID')
  async getStudy(@Param('studyID') studyID: string, @Res() res: Response) {
    const zipBuffer = await this.service.generateStudy(studyID);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Estudio Exportado.zip"`,
    );
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Length', `${zipBuffer.byteLength}`);
    res.send(zipBuffer);
    return res;
  }

  @Post('/:name')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('name') name: string,
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // const lastDot = file.originalname.lastIndexOf('.');
    // const extension = file.originalname.substring(lastDot + 1);
    return this.service.uploadFile(name, file.buffer, file.size);
  }

  @Post('/excel/:dictionaryID')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(
    @Param('dictionaryID') dictionaryID: string,
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // const lastDot = file.originalname.lastIndexOf('.');
    // const extension = file.originalname.substring(lastDot + 1);
    console.log('file', file);
    return this.service.uploadExcel(dictionaryID, file.buffer);
  }
}
