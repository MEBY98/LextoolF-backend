import { Injectable, OnModuleInit } from '@nestjs/common';
import exceljs from 'exceljs';
import fs from 'fs';
import { Client } from 'minio';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DescriptorService } from 'src/descriptor/descriptor.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UbicationService } from 'src/ubication/ubication.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ClasificationService } from 'src/clasification/clasification.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DictionaryService } from 'src/dictionary/dictionary.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FraseograficStudyService } from 'src/fraseograficStudy/fraseograficStudy.service';
import { ExcelError } from 'src/utils/ExcelErrors/ErrorsTypes';
import { validateExcelValue } from 'src/utils/ExcelErrors/ValidateValue';
import { NewEntryType } from 'src/entry/type/entry.type';
import { NewElementType } from 'src/element/type/element.type';
// import { Response } from 'express';
// import { Descriptor } from 'src/descriptor/model/descriptor.modelinterface';
import { zipDirectory, createMap } from 'src/utils/utils';
import { FraseograficStudyFullPopulated } from 'src/fraseograficStudy/dto/fraseograficStudy.dto';
import {
  createFolderStructure,
  writeExcel,
  deleteTempFolder,
} from 'src/utils/ExportedStudy/ExportedStudyUtils';
import {
  getLemmasOfDictionary,
  createNewElement,
} from 'src/utils/UploadExcel/UploadExcelUtils';
import {
  ExcelImage,
  validateImagePosition,
} from 'src/utils/ExcelErrors/ValidateImagePosition';
import { validateSheets } from 'src/utils/ExcelErrors/ValidateSheetsLetter';
import del from 'del';
@Injectable()
export class MinioService implements OnModuleInit {
  private client: Client;

  constructor(
    private readonly FraseograficStudyService: FraseograficStudyService,
    private readonly DictionaryService: DictionaryService,
    private readonly DescriptorService: DescriptorService,
    private readonly UbicationService: UbicationService,
    private readonly ClasificationService: ClasificationService,
  ) {
    this.client = new Client({
      endPoint: process.env.MINIO_ENDPOINT.toString(),
      port: parseInt(process.env.MINIO_PORT),
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY.toString(),
      secretKey: process.env.MINIO_SECRET_KEY.toString(),
    });
  }

  async getFile(name: string) {
    const img = await this.client.getObject('images', name);
    return img;
  }

  async uploadFile(name: string, data: Buffer, size = 0) {
    if (size) {
      return await this.client.putObject('images', name, data, size);
    } else {
      return await this.client.putObject('images', name, data);
    }
  }

  async uploadExcel(dictionaryID: string, data: Buffer) {
    const result = { entries: [], errors: [] };
    const errors: ExcelError[] = [];
    const entries: NewEntryType[] = [];
    const imagesToCreate: { context: string; imgFile: exceljs.Image }[] = [];
    //NoDescribeDescriptor
    const NoDescribeDescriptor = await this.DescriptorService.findByDescription(
      '<No descrito>',
    );

    //MapUbications
    const ubications = await this.UbicationService.findAll();
    const MapUbications = createMap(ubications, 'ubication', 'id');
    //MapClasifications
    const clasifications = await this.ClasificationService.findAll();
    const MapClasifications = createMap(clasifications, 'clasification', 'id');

    //Dictionary
    const d = await this.DictionaryService.findByID(dictionaryID);
    //LemmasOfDictionary
    const Lemmas = getLemmasOfDictionary(d);

    //Reading Excel
    const workBook = await new exceljs.Workbook().xlsx.load(data);

    //Validate excelSheets and letters dictionary
    const sheetErrors = validateSheets(workBook.worksheets, d.letters);
    if (sheetErrors) {
      errors.push(...(sheetErrors as ExcelError[]));
    }
    //Worksheets
    const workSheets = workBook.worksheets;
    workSheets.forEach((ws) => {
      // let actualImg: ExcelImage = undefined;
      // let beforeImg: ExcelImage = undefined;
      //Images
      ws.getImages().forEach((img) => {
        //Validate image positions
        // actualImg = img;
        // const imageValidation = validateImagePosition(
        //   actualImg,
        //   beforeImg,
        //   ws.name,
        // );
        // if (imageValidation instanceof ExcelError) {
        //   errors.push(imageValidation);
        // }
        // beforeImg = actualImg;

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
            if (cellValueU === 'lema') {
              if (!Lemmas.includes('<p>' + element + '</p>')) {
                ubication = MapUbications.get(cellValueU);
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
          elements.push(
            createNewElement(
              element,
              ubication,
              clasification,
              NoDescribeDescriptor,
            ),
          );
        }
        //Create images to create and context
        const imgFile = workBook.getImage(Number.parseInt(img.imageId));
        const imgNameMinIO =
          dictionaryID + '_' + Date.now() + '_' + '1' + '.' + imgFile.extension;
        imagesToCreate.push({ context: imgNameMinIO, imgFile });
        context.push(imgNameMinIO);
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
      for (
        let imagesToCreateIndex = 0;
        imagesToCreateIndex < imagesToCreate.length;
        imagesToCreateIndex++
      ) {
        const I = imagesToCreate[imagesToCreateIndex];
        this.uploadFile(I.context, I.imgFile.buffer as Buffer);
      }
    } else {
      result.errors = errors;
    }
    return result;
  }

  async generateStudy(studyID: string) {
    //Delete temp folder if exists
    if (fs.existsSync('temp')) {
      await del('temp');
    }

    //MapUbications
    const ubications = await this.UbicationService.findAll();
    const MapUbications = createMap(ubications, 'id', 'ubication');
    //MapClasifications
    const clasifications = await this.ClasificationService.findAll();
    const MapClasifications = createMap(clasifications, 'id', 'clasification');
    //MapDescriptors
    const descriptors = await this.DescriptorService.findAll();
    const MapDescriptors = createMap(descriptors, 'id', 'description');

    //Get study
    const study: FraseograficStudyFullPopulated = await this.FraseograficStudyService.findByIDFullPopulated(
      studyID,
    );

    //Create folder structure
    await createFolderStructure(study, MapUbications, this.client);
    //Create excel
    await writeExcel(study, MapUbications, MapClasifications, MapDescriptors);
    //Compress folder
    const zip = await zipDirectory(
      `temp/${study.name}`,
      `temp/${study.name}.zip`,
    );
    return fs.readFileSync(zip.path);
  }
  async onModuleInit() {
    const images = await this.client.bucketExists('images');
    if (!images) await this.client.makeBucket('images', 'sgd');
  }
}
