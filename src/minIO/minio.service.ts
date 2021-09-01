import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import exceljs from 'exceljs';
import path from 'path';
import { Client } from 'minio';
import {
  MINIO_ENDPOINT,
  MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY,
} from 'configuration/minIO.config';

@Injectable()
export class MinioService implements OnModuleInit {
  private client: Client;

  constructor() {
    this.client = new Client({
      endPoint: MINIO_ENDPOINT,
      port: 9000,
      useSSL: false,
      accessKey: MINIO_ACCESS_KEY,
      secretKey: MINIO_SECRET_KEY,
    });
  }

  async getFile(name: string) {
    const img = await this.client.getObject('docs', name);
    return img;
  }

  async getExcel(name: string) {
    const excel = await this.client.getObject('excels', name);
    return excel;
  }

  async uploadFile(name: string, data: Buffer, size: number) {
    const obj = await this.client.putObject('docs', name, data, size);
    return obj;
  }

  async uploadExcel(name: string, data: Buffer, size: number) {
    const obj = await this.client.putObject('excels', name, data, size);

    //Reading Excel
    const workBook = await new exceljs.Workbook().xlsx.load(data);
    console.log('workbook:', workBook);

    //Worksheets
    // const workSheets = workBook.worksheets;
    // workSheets.forEach(ws => {

    // });

    return obj;
  }

  async onModuleInit() {
    const docs = await this.client.bucketExists('docs');
    const excels = await this.client.bucketExists('excels');
    if (!docs) await this.client.makeBucket('docs', 'sgd');
    if (!excels) await this.client.makeBucket('excels', 'sgd');
  }
}
