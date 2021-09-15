import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import exceljs from 'exceljs';
import { Client } from 'minio';
import {
  MINIO_ENDPOINT,
  MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY,
} from 'configuration/minIO.config';
import { DescriptorService } from 'src/descriptor/descriptor.service';
import { UbicationService } from 'src/ubication/ubication.service';
import { ClasificationService } from 'src/clasification/clasification.service';
import { DictionaryService } from 'src/dictionary/dictionary.service';
import { Ubication } from 'src/ubication/model/ubication.modelinterface';
import { Clasification } from 'src/clasification/model/clasification.modelinterface';
import { ExcelError } from 'src/utils/ExcelErrors/ErrorsTypes';
import { validateExcelValue } from 'src/utils/ExcelErrors/ValidateValue';
import { NewEntryType, EntryType } from 'src/entry/type/entry.type';
import { NewElementType } from 'src/element/type/element.type';
@Injectable()
export class MinioService implements OnModuleInit {
  private client: Client;
  constructor(
    private readonly DictionaryService: DictionaryService,
    private readonly DescriptorService: DescriptorService,
    private readonly UbicationService: UbicationService,
    private readonly ClasificationService: ClasificationService,
  ) {
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

  async uploadFile(name: string, data: Buffer, size?: number) {
    const obj = await this.client.putObject('docs', name, data, size);
    return obj;
  }

  async uploadExcel(dictionaryID: string, data: Buffer) {
    const result = { entries: [], errors: [] };
    const errors: ExcelError[] = [];
    const entries: NewEntryType[] = [];

    //NoApplyDescriptor
    const NoApplyDescriptor = await this.DescriptorService.findByDescription(
      '<No aplica>',
    );

    //MapUbications
    const ubications = await this.UbicationService.findAll();
    const MapUbications = new Map();
    (ubications as Array<Ubication>).forEach(u => {
      MapUbications.set(u.ubication, u.id);
    });
    //MapClasifications
    const clasifications = await this.ClasificationService.findAll();
    const MapClasifications = new Map();
    (clasifications as Array<Clasification>).forEach(u => {
      MapClasifications.set(u.clasification, u.id);
    });

    //Reading Excel
    const workBook = await new exceljs.Workbook().xlsx.load(data);

    //Worksheets
    const workSheets = workBook.worksheets;
    workSheets.forEach(ws => {
      ws.getImages().forEach(img => {
        const letter: string = ws.name;
        const initRow: number = img.range.tl.nativeRow;
        const finalRow: number = img.range.br.nativeRow;
        const context: string[] = [];
        const elements: NewElementType[] = [];
        for (let index = initRow; index <= finalRow; index++) {
          //Row
          const row = ws.getRow(index + 1);
          //Element
          let element = '';
          if (!row.getCell('B').text) {
            errors.push(
              new ExcelError('Elemento', letter, index + 1, 'Celda vacía'),
            );
          } else {
            element = row.getCell('B').text;
          }
          //Ubication
          let ubication = '';
          const cellValueU = validateExcelValue(
            row.getCell('C').text,
            MapUbications,
            'Ubicación',
            letter,
            index + 1,
          );
          if (cellValueU instanceof ExcelError) {
            errors.push(cellValueU);
          } else {
            ubication = MapUbications.get(cellValueU);
          }
          //Clasification
          let clasification = '';
          const cellValueC = validateExcelValue(
            row.getCell('D').text,
            MapClasifications,
            'Clasificación',
            letter,
            index + 1,
          );
          if (cellValueC instanceof ExcelError) {
            errors.push(cellValueC);
          } else {
            clasification = MapClasifications.get(cellValueC);
          }
          elements.push({
            element,
            ubication,
            clasification,
            generalDescription: {
              conceptualDomain: NoApplyDescriptor.id,
              structure: NoApplyDescriptor.id,
              tipo: NoApplyDescriptor.id,
            },
            contornoDefinition: [
              {
                definition: '',
                typeOfDefinition: NoApplyDescriptor.id,
                argumentalSchema: NoApplyDescriptor.id,
                relationship: [],
                contorno: '',
                typeOfContorno: [],
                positionOfContorno: [],
                formatOfContorno: [],
              },
            ],
            example: {
              anotation: '',
              formatOfExample: [],
              functionOfExample: [],
              typeOfExample: [],
            },
            orderLemma: {
              criteriaOfLematization: [],
              formalStructure: [],
              formatOfVariant: [],
              order: [],
              tipographyOfVariant: [],
              typeOfVariant: [],
              ubicationOfContorno: NoApplyDescriptor.id,
            },
            paradigmaticInfo: {
              formOfPresentation: [],
              position: [],
              typeOfRelationship: NoApplyDescriptor.id,
            },
            useInformation: [
              {
                anotation: '',
                position: NoApplyDescriptor.id,
                format: NoApplyDescriptor.id,
                tipography: NoApplyDescriptor.id,
              },
              {
                anotation: '',
                position: NoApplyDescriptor.id,
                format: NoApplyDescriptor.id,
                tipography: NoApplyDescriptor.id,
              },
              {
                anotation: '',
                position: NoApplyDescriptor.id,
                format: NoApplyDescriptor.id,
                tipography: NoApplyDescriptor.id,
              },
              {
                anotation: '',
                position: NoApplyDescriptor.id,
                format: NoApplyDescriptor.id,
                tipography: NoApplyDescriptor.id,
              },
              {
                anotation: '',
                position: NoApplyDescriptor.id,
                format: NoApplyDescriptor.id,
                tipography: NoApplyDescriptor.id,
              },
              {
                anotation: '',
                position: NoApplyDescriptor.id,
                format: NoApplyDescriptor.id,
                tipography: NoApplyDescriptor.id,
              },
              {
                anotation: '',
                position: NoApplyDescriptor.id,
                format: NoApplyDescriptor.id,
                tipography: NoApplyDescriptor.id,
              },
              {
                anotation: '',
                position: NoApplyDescriptor.id,
                format: NoApplyDescriptor.id,
                tipography: NoApplyDescriptor.id,
              },
              {
                anotation: '',
                position: NoApplyDescriptor.id,
                format: NoApplyDescriptor.id,
                tipography: NoApplyDescriptor.id,
              },
              {
                anotation: '',
                position: NoApplyDescriptor.id,
                format: NoApplyDescriptor.id,
                tipography: NoApplyDescriptor.id,
              },
            ],
          });
        }

        const imgFile = workBook.getImage(Number.parseInt(img.imageId));
        const imgNameMinIO =
          elements[0].element +
          '_' +
          Date.now() +
          '_' +
          '1' +
          '.' +
          imgFile.extension;
        context.push(imgNameMinIO);
        this.uploadFile(imgNameMinIO, imgFile.buffer as Buffer);
        const newEntry = {
          letter,
          elements,
          context,
        };
        entries.push(newEntry);
      });
    });
    if (errors.length === 0) {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        result.entries.push(
          await this.DictionaryService.createEntryByDictionaryID(
            entry,
            dictionaryID,
          ),
        );
      }
    } else {
      result.errors = errors;
    }
    return result;
  }

  async onModuleInit() {
    const docs = await this.client.bucketExists('docs');
    const excels = await this.client.bucketExists('excels');
    if (!docs) await this.client.makeBucket('docs', 'sgd');
    if (!excels) await this.client.makeBucket('excels', 'sgd');
  }
}
