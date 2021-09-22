import {
  insertDocument,
  insertManyDescriptors,
} from '../src/utils/Migrations/mongoDbUtils';
import mongoose from 'mongoose';
//Anotación
const AnotationDescriptorType = {
  name: 'Anotación',
  inputType: 'text',
  tab: 'Example',
  multiInput: false,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
//Tipos de ejemplos
const TypeOfExampleDescriptorType = {
  name: 'Tipos de ejemplos',
  inputType: 'select',
  tab: 'Example',
  multiInput: true,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const TypeOfExampleDescriptors: string[] = [
  'sin ejemplo',
  'cita literaria con indicación de fuente',
  'cita literaria modificada',
  'de uso real sin indicación de fuente',
  'de uso real modificado',
  'creado',
];
//Formato del ejemplo fraseológico
const FormatOfExampleDescriptorType = {
  name: 'Formato del ejemplo fraseológico',
  inputType: 'select',
  tab: 'Example',
  multiInput: true,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const FormatOfExampleDescriptors: string[] = [
  'enunciado autónomo',
  'estructura sintagmática',
  'en letra versalita',
  'en letra cursiva',
  'en letra negrita',
  'en letra normal',
];
//Función del ejemplo fraseológico
const FunctionOfExampleDescriptorType = {
  name: 'Función del ejemplo fraseológico',
  inputType: 'select',
  tab: 'Example',
  multiInput: true,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const FunctionOfExampleDescriptors: string[] = [
  'desambiguación',
  'uso de la UF',
  'información sintáctica',
  'autorización del uso',
  'inclusión de colocación',
  'inclusión de datos culturales e históricos',
  'inclusión de información pragmática',
  'inclusión de información enciclopédica',
  'trasmisión de datos ideológicos y sociales',
];
export const up = async () => {
  let descriptorsIDs: mongoose.Types.ObjectId[] = [];
  //Anotacion
  AnotationDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', AnotationDescriptorType);
  //Tipos de ejemplos
  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    TypeOfExampleDescriptors,
  );
  TypeOfExampleDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', TypeOfExampleDescriptorType);
  //Formato del ejemplo
  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    FormatOfExampleDescriptors,
  );
  FormatOfExampleDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', FormatOfExampleDescriptorType);
  //Funcion del ejemplo
  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    FunctionOfExampleDescriptors,
  );
  FunctionOfExampleDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', FunctionOfExampleDescriptorType);
};

export const down = async () => {
  console.log('Down migration Example');
};
