import {
  insertDocument,
  insertManyDescriptors,
} from '../src/utils/Migrations/mongoDbUtils';
import mongoose from 'mongoose';

const createObservation = async (
  descriptors: any[],
  descriptorType: any,
  observation: any,
) => {
  const descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    descriptors,
  );
  descriptorType.descriptors = descriptorsIDs;
  const ops = await insertDocument('descriptortypes', descriptorType);
  const descriptorTypeID = ops[0]._id;
  observation.descriptorsTypes.push(descriptorTypeID);
  insertDocument('observations', observation);
};

//Ordenacion de la UF
const UfOrderLemmaObservation = {
  name: 'Ordenación de la UF',
  tab: 'OrderLemma',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
const UfOrderLemmaDescriptorType = {
  name: 'Ordenación de la UF',
  inputType: 'select',
  tab: 'OrderLemma',
  multiInput: true,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const UfOrderLemmaDescriptors = [
  'sin criterio alfabético',
  'alfabética discontinua',
  'alfabética continua',
  'por tipo de UF',
  'integrada en acep. sin signo y dif. tipografía',
  'integrada en acep. con signo y dif. tipografía',
  'después de acepc. con signo y dif. tipografía',
];
//Criterios de lematizacion
const UfCriteriaLemmatizationObservation = {
  name: 'Criterios de lematización',
  tab: 'OrderLemma',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
const UfCriteriaLemmatizationDescriptorType = {
  name: 'Criterios de lematización',
  inputType: 'select',
  tab: 'OrderLemma',
  multiInput: true,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const UfCriteriaLemmatizationDescriptors = [
  'Sust. como palabra principal',
  '1er Sust. como palabra principal',
  '2do Sust. como palabra principal',
  '3er Sust. como palabra principal',
  '4to Sust. como palabra principal',
  'Verbo como palabra principal',
  '1er Verbo como palabra principal',
  '2do Verbo como palabra principal',
  '3er Verbo como palabra principal',
  '4to Verbo como palabra principal',
  'Adj. como palabra principal',
  '1er Adj. como palabra principal',
  '2do Adj. como palabra principal',
  'Pronom. como palabra principal',
  '1er Pronom. como palabra principal',
  '2do Pronom. como palabra principal',
  'Adv. como palabra principal',
  '1er Adv. como palabra principal',
  '2do Adv. como palabra principal',
  'Sust. sinónimo del lema',
];
//Estructura formal
const UfFormalStructureObservation = {
  name: 'Estructura formal',
  tab: 'OrderLemma',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
const UfFormalStructureDescriptorType = {
  name: 'Estructura formal',
  inputType: 'select',
  tab: 'OrderLemma',
  multiInput: true,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const UfFormalStructureDescriptors = [
  'se repite el lema en la UF',
  'el lema no es un constituyente de la UF',
  'UF con signo que sustituye al lema',
  'con casillas vacías',
  'sin contorno argumental',
  'con contorno de suj.',
  'con contorno de OD',
  'con contorno de OI',
  'con contorno de CR',
  'con duplicación de argumentos',
  'con artículo como elemento facultativo',
  'con pronombre como elemento facultativo',
  'con verbo como elemento facultativo',
  'con elementos intensificadores',
  'con `no´, `nadie´, `sin´ como elementos facultativos',
  'con elementos que cambian el registro estilístico',
  'con elementos que aclaran la forma interna',
  'con `no´, `nadie´, `sin´ como elementos constitutivos',
  'con segundo verbo conjugado',
  'con segundo verbo en participio',
  'con segundo en gerundio',
];
//CContorno argumental
const UfContornoObservation = {
  name: 'Contorno argumental',
  tab: 'OrderLemma',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
const UfContornoDescriptorType = {
  name: 'Contorno argumental',
  inputType: 'select',
  tab: 'OrderLemma',
  multiInput: false,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const UfContornoDescriptors = [
  'loc. + contorno suj.',
  'loc. + contorno OD',
  'loc. + contorno OI',
  'loc. + contorno CR',
  'loc. + contorno suj. + contorno OD',
  'loc. + contorno suj. + contorno OI',
  'loc. + contorno OD + contorno suj.',
  'loc. + contorno OI + contorno suj.',
  'loc. + contorno OD + contorno OI',
  'loc. + contorno OI + contorno OD',
  'loc… + contorno suj. + …loc.',
  'loc… + contorno OD + …loc.',
  'loc… + contorno OI + …loc.',
  'loc… + contorno suj. + …loc. + contorno OD',
  'loc… + contorno suj. + …loc. + contorno OI',
  'loc… + contorno OD + …loc + contorno suj.',
  'loc… + contorno OI + …loc + contorno suj.',
];
//Tipos de variantes
const UfTypeOfVariantObservation = {
  name: 'Tipos de variantes',
  tab: 'OrderLemma',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
const UfTypeOfVariantDescriptorType = {
  name: 'Tipos de variantes',
  inputType: 'select',
  tab: 'OrderLemma',
  multiInput: true,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const UfTypeOfVariantDescriptors = [
  'sin variantes',
  'cambio núcleo nominal por un sinónimo',
  'cambio núcleo nominal por otro del mismo campo semántico',
  'cambio del núcleo verbal por un sinónimo',
  'cambio núcleo verbal por otro del mismo campo semántico',
  'cambio por modificación derivativa (prefijo)',
  'cambio por modificación derivativa (sufijo)',
  'cambio por modificación derivativa (interfijo)',
  'cambio de artículo y pronombre',
  'cambio de artículo determinado/ indeterminado',
  'cambio de pronombre',
  'cambio de preposición',
  'cambio de número',
  'cambio de género',
  'cambio de género y número',
  'cambio de ordenamiento',
  'cambios gráficos',
  'cambio por modificación ortográfica',
  'variación por adición de componentes',
  'variación por omisión de componentes',
  'variación marcada diacrónicamente',
  'variación marcada diatópicamente',
  'variación marcada diastráticamente',
  'variación marcada diafásicamente',
];
//Formato de las variantes
const UfFormatOfVariantObservation = {
  name: 'Formato de las variantes',
  tab: 'OrderLemma',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
const UfFormatOfVariantDescriptorType = {
  name: 'Formato de las variantes',
  inputType: 'select',
  tab: 'OrderLemma',
  multiInput: true,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const UfFormatOfVariantDescriptors = [
  'separadas por barras oblicuas',
  'separadas por corchetes',
  'separadas por paréntesis',
  'separadas por signos ortográficos (,)',
  'separadas por signos ortográficos (;)',
  'separadas por conjunción',
];
//Tipografía de las variantes
const UfTipographyOfVariantObservation = {
  name: 'Tipografía de las variantes',
  tab: 'OrderLemma',
  descriptorsTypes: new Array<mongoose.Types.ObjectId>(),
};
const UfTipographyOfVariantDescriptorType = {
  name: 'Tipografía de las variantes',
  inputType: 'select',
  tab: 'OrderLemma',
  multiInput: true,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const UfTipographyOfVariantDescriptors = [
  'con el mismo tipo de letra',
  'con diferente tipo de letra (cursiva)',
  'con diferente tipo de letra (normal)',
];
export const up = async () => {
  //Ordenacion de la UF
  await createObservation(
    UfOrderLemmaDescriptors,
    UfOrderLemmaDescriptorType,
    UfOrderLemmaObservation,
  );
  //Criterios de lematizacion
  await createObservation(
    UfCriteriaLemmatizationDescriptors,
    UfCriteriaLemmatizationDescriptorType,
    UfCriteriaLemmatizationObservation,
  );
  //Estructura formal
  await createObservation(
    UfFormalStructureDescriptors,
    UfFormalStructureDescriptorType,
    UfFormalStructureObservation,
  );
  //Contorno argumental
  await createObservation(
    UfContornoDescriptors,
    UfContornoDescriptorType,
    UfContornoObservation,
  );
  //Tipos de variantes
  await createObservation(
    UfTypeOfVariantDescriptors,
    UfTypeOfVariantDescriptorType,
    UfTypeOfVariantObservation,
  );
  //Formato de las variantes
  await createObservation(
    UfFormatOfVariantDescriptors,
    UfFormatOfVariantDescriptorType,
    UfFormatOfVariantObservation,
  );
  //Tipografía de las variantes
  await createObservation(
    UfTipographyOfVariantDescriptors,
    UfTipographyOfVariantDescriptorType,
    UfTipographyOfVariantObservation,
  );
};

export const down = async () => {
  console.log('Down migration OrderLemma');
};
