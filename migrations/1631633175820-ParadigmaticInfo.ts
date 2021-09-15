import {
  insertDocument,
  insertManyDescriptors,
} from '../src/utils/Migrations/mongoDbUtils';
import mongoose from 'mongoose';
//Tipos de relaciones paradigmáticas
const TypeDescriptorType = {
  name: 'Tipos de relaciones paradigmáticas',
  inputType: 'select',
  tab: 'ParadigmaticInfo',
  multiInput: false,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const TypeDescriptors: string[] = [
  'sinonimia',
  'antonimia contraste de parte de sus elementos',
  'antononia de los significados fraseológicos',
  'hiponimia',
  'hiperonimia',
  'meronimia',
];
//Forma de presentación
const FormOfPresentationDescriptorType = {
  name: 'Forma de presentación',
  inputType: 'select',
  tab: 'ParadigmaticInfo',
  multiInput: true,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const FormOfPresentationDescriptors: string[] = [
  'sin indicación de relaciones paradigmáticas',
  'con un símbolo y en un apartado propio',
  'con una marcación y en un apartado propio',
  'mediante remisión a otra UF',
  'mediante un signo ortográfico',
  'mediante la conjunción o',
  'insertada en la definición',
];
//Posición
const PositionDescriptorType = {
  name: 'Posición',
  inputType: 'select',
  tab: 'ParadigmaticInfo',
  multiInput: true,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const PositionDescriptors: string[] = [
  'inicio de la definición',
  'final de la definición',
  'en un apartado propio',
  'insertada en la definición',
];
export const up = async () => {
  let descriptorsIDs: mongoose.Types.ObjectId[] = [];
  //Tipos de relaciones
  descriptorsIDs = await insertManyDescriptors('descriptors', TypeDescriptors);
  TypeDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', TypeDescriptorType);
  //Forma de presentacion
  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    FormOfPresentationDescriptors,
  );
  FormOfPresentationDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', FormOfPresentationDescriptorType);
  //Posicion
  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    PositionDescriptors,
  );
  PositionDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', PositionDescriptorType);
};

export const down = async () => {
  console.log('Down migration ParadigmaticInfo');
};
