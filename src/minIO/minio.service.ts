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
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MinioService implements OnModuleInit {
  private client: Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly DictionaryService: DictionaryService,
    private readonly DescriptorService: DescriptorService,
    private readonly UbicationService: UbicationService,
    private readonly ClasificationService: ClasificationService,
  ) {
    this.client = new Client({
      endPoint: configService.get<string>('MINIO_ENDPOINT'),
      port: 9000,
      useSSL: false,
      accessKey: configService.get<string>('MINIO_ACCESS_KEY'),
      secretKey: configService.get<string>('MINIO_SECRET_KEY'),
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

    //NoDescribeDescriptor
    const NoDescribeDescriptor = await this.DescriptorService.findByDescription(
      '<No descrito>',
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

    //LemmasOfDictionary
    const Lemmas = await this.DictionaryService.findByID(dictionaryID).then(
      d => {
        const lemmaList: string[] = [];
        for (let entryIndex = 0; entryIndex < d.entries.length; entryIndex++) {
          const entry = d.entries[entryIndex];
          let isLemma = false;
          for (
            let elementIndex = 0;
            elementIndex < entry.elements.length && !isLemma;
            elementIndex++
          ) {
            const element = entry.elements[elementIndex];
            if (element.clasification.clasification === 'Lema') {
              isLemma = true;
            }
            lemmaList.push(element.element);
          }
        }
        return lemmaList;
      },
    );

    //Reading Excel
    const workBook = await new exceljs.Workbook().xlsx.load(data);

    //Worksheets
    const workSheets = workBook.worksheets;
    workSheets.forEach(ws => {
      let actualImg: {
        type: 'image';
        imageId: string;
        range: exceljs.ImageRange;
      } = undefined;
      let beforeImg: {
        type: 'image';
        imageId: string;
        range: exceljs.ImageRange;
      } = undefined;
      ws.getImages().forEach(img => {
        actualImg = img;
        if (actualImg && beforeImg) {
          const actualImgInitRow = actualImg.range.tl.nativeRow;
          const beforeImgFinalRow = beforeImg.range.br.nativeRow;
          if (actualImgInitRow <= beforeImgFinalRow) {
            errors.push(
              new ExcelError(
                'Imagen',
                ws.name,
                actualImgInitRow + 1,
                'Imagen mal colocada',
              ),
            );
          }
          if (actualImgInitRow - beforeImgFinalRow > 1) {
            errors.push(
              new ExcelError(
                'Imagen',
                ws.name,
                actualImgInitRow,
                'Fila sin imagen',
              ),
            );
          }
        }
        beforeImg = actualImg;
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
            if (cellValueU === 'Lema') {
              if (!Lemmas.includes(element)) {
                ubication = MapUbications.get(cellValueU);
                console.log('ubication', ubication);
              } else {
                errors.push(
                  new ExcelError(
                    'Elemento',
                    letter,
                    index + 1,
                    'Elemento existente',
                  ),
                );
              }
            } else {
              ubication = MapUbications.get(cellValueU);
            }
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
              conceptualDomain: NoDescribeDescriptor.id,
              structure: NoDescribeDescriptor.id,
              tipo: NoDescribeDescriptor.id,
            },
            contornoDefinition: [
              {
                definition: '',
                typeOfDefinition: NoDescribeDescriptor.id,
                argumentalSchema: NoDescribeDescriptor.id,
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
              ubicationOfContorno: NoDescribeDescriptor.id,
            },
            paradigmaticInfo: {
              formOfPresentation: [],
              position: [],
              typeOfRelationship: NoDescribeDescriptor.id,
            },
            useInformation: [
              {
                anotation: '',
                position: NoDescribeDescriptor.id,
                format: NoDescribeDescriptor.id,
                tipography: NoDescribeDescriptor.id,
              },
              {
                anotation: '',
                position: NoDescribeDescriptor.id,
                format: NoDescribeDescriptor.id,
                tipography: NoDescribeDescriptor.id,
              },
              {
                anotation: '',
                position: NoDescribeDescriptor.id,
                format: NoDescribeDescriptor.id,
                tipography: NoDescribeDescriptor.id,
              },
              {
                anotation: '',
                position: NoDescribeDescriptor.id,
                format: NoDescribeDescriptor.id,
                tipography: NoDescribeDescriptor.id,
              },
              {
                anotation: '',
                position: NoDescribeDescriptor.id,
                format: NoDescribeDescriptor.id,
                tipography: NoDescribeDescriptor.id,
              },
              {
                anotation: '',
                position: NoDescribeDescriptor.id,
                format: NoDescribeDescriptor.id,
                tipography: NoDescribeDescriptor.id,
              },
              {
                anotation: '',
                position: NoDescribeDescriptor.id,
                format: NoDescribeDescriptor.id,
                tipography: NoDescribeDescriptor.id,
              },
              {
                anotation: '',
                position: NoDescribeDescriptor.id,
                format: NoDescribeDescriptor.id,
                tipography: NoDescribeDescriptor.id,
              },
              {
                anotation: '',
                position: NoDescribeDescriptor.id,
                format: NoDescribeDescriptor.id,
                tipography: NoDescribeDescriptor.id,
              },
              {
                anotation: '',
                position: NoDescribeDescriptor.id,
                format: NoDescribeDescriptor.id,
                tipography: NoDescribeDescriptor.id,
              },
            ],
          });
          console.log('elementsAfterPush', elements);
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
