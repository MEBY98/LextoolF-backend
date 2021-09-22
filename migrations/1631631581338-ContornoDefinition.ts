import {
  insertDocument,
  insertManyDescriptors,
} from '../src/utils/Migrations/mongoDbUtils';
import mongoose from 'mongoose';
//#####################################Definición##########################################################
//Tipo de definición
const TypeOfDefinitionDescriptorType = {
  name: 'Tipo de definición',
  inputType: 'select',
  tab: 'Definition',
  multiInput: false,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const TypeOfDefinitionDescriptors: string[] = [
  'sin definición',
  'perifrástica simple',
  'perifrástica múltiple',
  'perifrástica sustancial incluyente positiva',
  'perifrástica sustancial excluyente o antonimia',
  'sinonímica con una UF sinónima',
  'sinonímica con una ULS sinónima',
  'sinonímica con una UF sinónima mediante fórmula',
  'sinonímica con una ULS sinónima mediante fórmula',
  'sinonímica mixta',
  'parasinonímica',
  'híbrida',
  'pseudoperifrástica',
  'remisión a otro artículo mediante una fórmula (ver)',
  'remisión a otra unidad pluriverbal',
  'con datos extralingüísticos',
  'explicación normativa',
  'explicación sobre el uso',
];
//Esquema argumental
const ArgumentalSchemaDescriptorType = {
  name: 'Esquema argumental',
  inputType: 'select',
  tab: 'Definition',
  multiInput: false,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const ArgumentalSchemaDescriptors: string[] = [
  'alguien[Suj.] locución a alguien[OD]',
  'alguien[Suj.] locución a alguien[OI]',
  'alguien[Suj.] locución [le]',
  'algo[Suj.] locución a alguien[OI]',
  'alguien[Suj.] locución',
  'locución a alguien[OD]',
  'locución a alguien[Suj.]',
  'algo[Suj.] locución',
];
//Relación entre definido y definidor
const RelationshipDescriptorType = {
  name: 'Relación entre definido y definidor',
  inputType: 'select',
  tab: 'Definition',
  multiInput: true,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const RelationshipDescriptors: string[] = [
  'Sust. de la UF se repite en la definición (rel. de hipon.)',
  'Sust. de la UF se repite en la definición (rel. de hiperon.)',
  'Sust. de la UF se repite en la definición (sin rel. hiperon.-hipon.)',
  'Verbo de la UF se repite en la definición (hipon.)',
  'Verbo de la UF se repite en la definición (hiperon.)',
  'Verbo de la UF se repite en la definición (sin rel. hiperon.-hipon.)',
  'Verbo definidor no refleja el comportamiento argumental de la UF',
  'enunciado definidor de la UF es una UF sinónima',
  'enunciado definidor es la ULC',
  'en relación anafórica con el lema',
  'sin coincidencia categorial entre definido y definidor',
];
//#####################################Contorno##########################################################
//Tipo de contorno definicional
const TypeOfContornoDescriptorType = {
  name: 'Tipo de contorno definicional',
  inputType: 'select',
  tab: 'Contorno',
  multiInput: true,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const TypeOfContornoDescriptors: string[] = [
  'sin contorno definicional',
  'de suj._referente animado con cierta especificidad',
  'de suj._referente humano con especificidad de sexo o edad',
  'de suj._referente humano sin especificación',
  'de suj._referente inanimado con cierta especificidad',
  'de suj._referente humano e inanimado',
  'de OD_referente animado con cierta especificidad',
  'de OD_referente humano con especificidad de sexo o edad',
  'de OD_referente humano sin especificación',
  'de OD_referente inanimado con cierta especificidad',
  'de OD_referente humano e inanimado',
  'de OI_referente animado con cierta especificidad',
  'de OI_referente humano con especificidad de sexo o edad',
  'de OI_referente humano sin especificación',
  'de OI_referente inanimado con cierta especificidad',
  'de OI_referente humano e inanimado',
  'de complemento de RP',
  'especificador_actividad humana',
  'especificador_colectivo humano',
  'especificador_tipo de entidad',
  'situacional_ámbito',
];
//Posición del contorno
const PositionOfContornoDescriptorType = {
  name: 'Posición del contorno',
  inputType: 'select',
  tab: 'Contorno',
  multiInput: true,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const PositionOfContornoDescriptors: string[] = [
  'antes de la definición entre signos ortográficos',
  'antes de la definición mediante paráfrasis',
  'integrado en la definición',
  'después de la definición mediante paráfrasis (se aplica a)',
  'después de la definición mediante paráfrasis (se dice de)',
  'después de la definición mediante paráfrasis (generalmente con el verbo /con los verbos)',
  'En el ejemplo en forma de restricción léxica',
];
//Formato del contorno
const FormatOfContornoDescriptorType = {
  name: 'Formato del contorno',
  inputType: 'select',
  tab: 'Contorno',
  multiInput: true,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const FormatOfContornoDescriptors: string[] = [
  'sin destaque',
  'en abreviaturas',
  'en letra cursiva',
  'en letra negrita',
  'en letra normal',
  'entre corchetes',
  'entre paréntesis',
  'entre llaves',
];
export const up = async () => {
  let descriptorsIDs: mongoose.Types.ObjectId[] = [];
  //#####Definición#####
  //Tipo de dedfinición
  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    TypeOfDefinitionDescriptors,
  );
  TypeOfDefinitionDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', TypeOfDefinitionDescriptorType);
  //Esquema argumental
  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    ArgumentalSchemaDescriptors,
  );
  ArgumentalSchemaDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', ArgumentalSchemaDescriptorType);
  //Relación entre definido y definidor
  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    RelationshipDescriptors,
  );
  RelationshipDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', RelationshipDescriptorType);
  //#####Contorno#####
  //Tipo de contorno definicional
  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    TypeOfContornoDescriptors,
  );
  TypeOfContornoDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', TypeOfContornoDescriptorType);
  //Posición del contorno
  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    PositionOfContornoDescriptors,
  );
  PositionOfContornoDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', PositionOfContornoDescriptorType);
  //Formato del contorno
  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    FormatOfContornoDescriptors,
  );
  FormatOfContornoDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', FormatOfContornoDescriptorType);
};

export const down = async () => {
  console.log('Down migration ContornoDefinition');
};
