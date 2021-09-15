import { insertDocument, insertManyDescriptors } from './mongoDbUtils';
import mongoose from 'mongoose';

//Informacion de uso
export const UseInformationGramatical = {
  name: 'Gramatical',
  tab: 'UseInformation',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
export const UseInformationTS = {
  name: 'Transición semántica',
  tab: 'UseInformation',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
export const UseInformationDiatopica = {
  name: 'Diatópica',
  tab: 'UseInformation',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
export const UseInformationDiafasica = {
  name: 'Diafásica',
  tab: 'UseInformation',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
export const UseInformationDiatrastica = {
  name: 'Diatrástica',
  tab: 'UseInformation',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
export const UseInformationDiatecnica = {
  name: 'Diatécnica',
  tab: 'UseInformation',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
export const UseInformationPrag = {
  name: 'Pragmática',
  tab: 'UseInformation',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
export const UseInformationFreq = {
  name: 'Frecuencia',
  tab: 'UseInformation',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
export const UseInformationTemp = {
  name: 'Temporal',
  tab: 'UseInformation',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
export const UseInformationN = {
  name: 'Normativa',
  tab: 'UseInformation',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};

export const UseInformationDescriptorTypes = [
  {
    name: 'Anotación',
    inputType: 'text',
    tab: 'UseInformation',
    multiInput: false,
    descriptors: new Array<mongoose.Types.ObjectId>(),
  },
  {
    name: 'Posición',
    inputType: 'select',
    tab: 'UseInformation',
    multiInput: false,
    descriptors: new Array<mongoose.Types.ObjectId>(),
  },
  {
    name: 'Formato',
    inputType: 'select',
    tab: 'UseInformation',
    multiInput: false,
    descriptors: new Array<mongoose.Types.ObjectId>(),
  },
  {
    name: 'Tipografía',
    inputType: 'select',
    tab: 'UseInformation',
    multiInput: false,
    descriptors: new Array<mongoose.Types.ObjectId>(),
  },
];

export const UseInformationPositionDescriptors = [
  'inicio de la definición',
  'en medio de la definición',
  'final de la definición',
  'separada de la definición',
];
export const UseInformationFormatDescriptors = [
  'marca abreviada',
  'explicación',
];
export const UseInformationTipographyDescriptors = [
  'sin cambio',
  'en letra versalita',
  'en letra cursiva',
  'en letra negrita',
  'en letra normal',
];
