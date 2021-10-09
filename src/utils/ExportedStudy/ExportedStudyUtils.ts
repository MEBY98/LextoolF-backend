import exceljs from 'exceljs';
import path from 'path';
import { FraseograficStudyFullPopulated } from 'src/fraseograficStudy/dto/fraseograficStudy.dto';
import fs from 'fs';
import del from 'del';
import { Client } from 'minio';
import { deleteHtmlTags, extractLemma, stream2buffer } from '../utils';
import { ElementDescriptorsAsStringDto } from 'src/element/dto/element.dto';

export async function readExcelTemplate(): Promise<exceljs.Workbook> {
  console.log('__dirname', __dirname);
  const excelTemplatePath = path.resolve(
    __dirname +
      '../../../../../src/utils/ExportedStudy/ExportedExcelTemplate.xlsx',
  );
  const workBook = await new exceljs.Workbook().xlsx.readFile(
    excelTemplatePath,
  );
  return workBook;
}

export function multipleSelectDescriptors(
  MapDescriptors: Map<string, string>,
  descriptorIds: string[],
) {
  const result: string[] = [];
  for (let index = 0; index < descriptorIds.length; index++) {
    const dID = descriptorIds[index];
    result.push(MapDescriptors.get(dID.toString()));
  }
  return result;
}
export function fillRow(
  studyName: string,
  dictionarySiglas: string,
  letter: string,
  element: ElementDescriptorsAsStringDto,
  MapUbications: Map<string, string>,
  MapClasifications: Map<string, string>,
  MapDescriptors: Map<string, string>,
  ContDefIndex: number,
) {
  const row = [];
  row.push(
    studyName,
    dictionarySiglas,
    letter,
    deleteHtmlTags(element.element),
    MapUbications.get(element.ubication.toString()),
    MapClasifications.get(element.clasification.toString()),
    MapDescriptors.get(element.generalDescription.tipo),
    MapDescriptors.get(element.generalDescription.structure),
    MapDescriptors.get(element.generalDescription.conceptualDomain),
    multipleSelectDescriptors(
      MapDescriptors,
      element.orderLemma.order,
    ).toString(),
    multipleSelectDescriptors(
      MapDescriptors,
      element.orderLemma.criteriaOfLematization,
    ).toString(),
    multipleSelectDescriptors(
      MapDescriptors,
      element.orderLemma.formalStructure,
    ).toString(),
    MapDescriptors.get(element.orderLemma.ubicationOfContorno).toString(),
    multipleSelectDescriptors(MapDescriptors, element.orderLemma.typeOfVariant),
    multipleSelectDescriptors(
      MapDescriptors,
      element.orderLemma.formatOfVariant,
    ).toString(),
    multipleSelectDescriptors(
      MapDescriptors,
      element.orderLemma.tipographyOfVariant,
    ).toString(),
    element.useInformation[0].anotation,
    MapDescriptors.get(element.useInformation[0].position.toString()),
    MapDescriptors.get(element.useInformation[0].format.toString()),
    MapDescriptors.get(element.useInformation[0].tipography.toString()),
    element.useInformation[1].anotation,
    MapDescriptors.get(element.useInformation[1].position.toString()),
    MapDescriptors.get(element.useInformation[1].format.toString()),
    MapDescriptors.get(element.useInformation[1].tipography.toString()),
    element.useInformation[2].anotation,
    MapDescriptors.get(element.useInformation[2].position.toString()),
    MapDescriptors.get(element.useInformation[2].format.toString()),
    MapDescriptors.get(element.useInformation[2].tipography.toString()),
    element.useInformation[3].anotation,
    MapDescriptors.get(element.useInformation[3].position.toString()),
    MapDescriptors.get(element.useInformation[3].format.toString()),
    MapDescriptors.get(element.useInformation[3].tipography.toString()),
    element.useInformation[4].anotation,
    MapDescriptors.get(element.useInformation[4].position.toString()),
    MapDescriptors.get(element.useInformation[4].format.toString()),
    MapDescriptors.get(element.useInformation[4].tipography.toString()),
    element.useInformation[5].anotation,
    MapDescriptors.get(element.useInformation[5].position.toString()),
    MapDescriptors.get(element.useInformation[5].format.toString()),
    MapDescriptors.get(element.useInformation[5].tipography.toString()),
    element.useInformation[6].anotation,
    MapDescriptors.get(element.useInformation[6].position.toString()),
    MapDescriptors.get(element.useInformation[6].format.toString()),
    MapDescriptors.get(element.useInformation[6].tipography.toString()),
    element.useInformation[7].anotation,
    MapDescriptors.get(element.useInformation[7].position.toString()),
    MapDescriptors.get(element.useInformation[7].format.toString()),
    MapDescriptors.get(element.useInformation[7].tipography.toString()),
    element.useInformation[8].anotation,
    MapDescriptors.get(element.useInformation[8].position.toString()),
    MapDescriptors.get(element.useInformation[8].format.toString()),
    MapDescriptors.get(element.useInformation[8].tipography.toString()),
    element.useInformation[9].anotation,
    MapDescriptors.get(element.useInformation[9].position.toString()),
    MapDescriptors.get(element.useInformation[9].format.toString()),
    MapDescriptors.get(element.useInformation[9].tipography.toString()),
    element.contornoDefinition[ContDefIndex].definition,
    MapDescriptors.get(
      element.contornoDefinition[ContDefIndex].typeOfDefinition.toString(),
    ),
    MapDescriptors.get(
      element.contornoDefinition[ContDefIndex].argumentalSchema.toString(),
    ),
    multipleSelectDescriptors(
      MapDescriptors,
      element.contornoDefinition[ContDefIndex].relationship,
    ).toString(),
    element.contornoDefinition[ContDefIndex].contorno,
    multipleSelectDescriptors(
      MapDescriptors,
      element.contornoDefinition[ContDefIndex].typeOfContorno,
    ).toString(),
    multipleSelectDescriptors(
      MapDescriptors,
      element.contornoDefinition[ContDefIndex].positionOfContorno,
    ).toString(),
    multipleSelectDescriptors(
      MapDescriptors,
      element.contornoDefinition[ContDefIndex].formatOfContorno,
    ).toString(),
    element.example.anotation,
    multipleSelectDescriptors(
      MapDescriptors,
      element.example.typeOfExample,
    ).toString(),
    multipleSelectDescriptors(
      MapDescriptors,
      element.example.formatOfExample,
    ).toString(),
    multipleSelectDescriptors(
      MapDescriptors,
      element.example.functionOfExample,
    ).toString(),
    MapDescriptors.get(element.paradigmaticInfo.typeOfRelationship.toString()),
    multipleSelectDescriptors(
      MapDescriptors,
      element.paradigmaticInfo.formOfPresentation,
    ).toString(),
    multipleSelectDescriptors(
      MapDescriptors,
      element.paradigmaticInfo.position,
    ).toString(),
  );
  return row;
}
export async function writeExcel(
  study: FraseograficStudyFullPopulated,
  MapUbications: Map<string, string>,
  MapClasifications: Map<string, string>,
  MapDescriptors: Map<string, string>,
) {
  const excel = await readExcelTemplate();
  for (
    let dictionariesIndex = 0;
    dictionariesIndex < study.dictionaries.length;
    dictionariesIndex++
  ) {
    const d = study.dictionaries[dictionariesIndex];
    for (let entryIndex = 0; entryIndex < d.entries.length; entryIndex++) {
      const entry = d.entries[entryIndex];
      for (
        let elementIndex = 0;
        elementIndex < entry.elements.length;
        elementIndex++
      ) {
        const element = entry.elements[elementIndex];
        for (
          let ContDefIndex = 0;
          ContDefIndex < element.contornoDefinition.length;
          ContDefIndex++
        ) {
          const newRow = fillRow(
            study.name,
            d.dictionaryInfo.siglas,
            entry.letter,
            element,
            MapUbications,
            MapClasifications,
            MapDescriptors,
            ContDefIndex,
          );
          excel.worksheets[0].addRow(newRow);
        }
      }
    }
  }
  const excelBuffer = await excel.xlsx.writeBuffer();
  fs.writeFileSync(
    `temp/${study.name}/Estudio(${study.initYear}-${study.finalYear}).xlsx`,
    excelBuffer,
  );
}

export async function createFolderStructure(
  study: FraseograficStudyFullPopulated,
  MapUbications: Map<string, string>,
  minIOClient: Client,
) {
  fs.mkdirSync(`temp/${study.name}`, { recursive: true });
  for (
    let dictionariesIndex = 0;
    dictionariesIndex < study.dictionaries.length;
    dictionariesIndex++
  ) {
    const d = study.dictionaries[dictionariesIndex];
    fs.mkdirSync(`temp/${study.name}/${d.dictionaryInfo.siglas}`, {
      recursive: true,
    });
    for (let letterIndex = 0; letterIndex < d.letters.length; letterIndex++) {
      const l = d.letters[letterIndex];
      fs.mkdirSync(`temp/${study.name}/${d.dictionaryInfo.siglas}/${l}`, {
        recursive: true,
      });
    }
    for (let entryIndex = 0; entryIndex < d.entries.length; entryIndex++) {
      const e = d.entries[entryIndex];
      let isLemma = false;
      let lemma = '';
      for (
        let elementIndex = 0;
        elementIndex < e.elements.length && !isLemma;
        elementIndex++
      ) {
        const element = e.elements[elementIndex];
        if ('lema' === MapUbications.get(element.ubication.toString())) {
          isLemma = true;
          lemma = element.element;
          fs.mkdirSync(
            `temp/${study.name}/${d.dictionaryInfo.siglas}/${
              e.letter
            }/${extractLemma(lemma)}`,
            { recursive: true },
          );
        }
      }
      if (!isLemma) {
        lemma = e.elements[0].element;
        fs.mkdirSync(
          `temp/${study.name}/${d.dictionaryInfo.siglas}/${
            e.letter
          }/${extractLemma(lemma)}`,
          { recursive: true },
        );
      }
      for (
        let contextIndex = 0;
        contextIndex < e.context.length;
        contextIndex++
      ) {
        const c = e.context[contextIndex];
        const imgRedeable = await minIOClient.getObject('images', c);
        const imgWritable = fs.createWriteStream(
          `temp/${study.name}/${d.dictionaryInfo.siglas}/${
            e.letter
          }/${extractLemma(lemma)}/${contextIndex + 1}.png`,
        );
        imgRedeable.pipe(imgWritable);
      }
    }
  }
}

export async function deleteTempFolder() {
  await del('temp');
  // fs.rmdirSync('temp', { recursive: true });
}
