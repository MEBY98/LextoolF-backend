import {
  insertDocument,
  insertManyDescriptors,
} from '../src/utils/Migrations/mongoDbUtils';
import mongoose from 'mongoose';

//Tipo de UF
const UfTypeDescriptorType = {
  name: 'Tipo de UF',
  inputType: 'select',
  tab: 'GeneralDescription',
  multiInput: false,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const UfTypeDescriptors: string[] = [
  'loc. nom.',
  'loc. adj.',
  'loc. adv.',
  'loc. verb. tr.',
  'loc. verb. intr.',
  'loc. verb. pronom.',
  'loc. verb. impers.',
  'loc. prepos.',
  'loc. claus.',
  'loc. conjunt.',
  'coloc. nom. [Sust. + Sust.]',
  'coloc. nom. [Sust. + Adj.]',
  'coloc. nom. [Sust. + prep. + Sust.]',
  'coloc. [Sust. + V]',
  'coloc. [V + Adv.]',
  'coloc. [Adj. + Adv.]',
  'coloc. complej. [V + loc. adv.]',
  'coloc. complej. [Sust. + loc. adj.]',
  'coloc. complej. [Sust. + loc. verb.]',
  'cit.',
  'refr.',
  'frase prov.',
  'fórm.',
  'loc. ¿adj. / adv.?',
  'loc. ¿verb.?',
  '¿fórm.?',
  '¿frase prov.?',
];
//Estructura de la UF
const UfStructureDescriptorType = {
  name: 'Estructura de la UF',
  inputType: 'select',
  tab: 'GeneralDescription',
  multiInput: false,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const UfStructureDescriptors: string[] = [
  'Sust. + Adj.',
  'Sust. + Sust.',
  'Sust. + prep. de',
  '(prep.) + Sust. + prep.',
  'Sust. + prep. de + Sust.',
  'Sust. + prep. con + Sust. + prep. de + Sust.',
  'Sust. + conj. + Sust.',
  'Sust. coord. + prep.',
  'Sust. (suj.) + V',
  'como + Sust. / GN',
  'art. + Sust. + prep. de + Sust.',
  'art. neutro + Adj.',
  'art. neutro + SP',
  'art. neutro + oración de relativo',
  'Adj./partic. + prep. + Sust.',
  'Adj. + como + Sust.',
  'más + Adj. + que + Adj.',
  'Adj. + conj. + Adj.',
  'Adj.+ Adv.',
  'prep. a + (det.) + Sust.',
  'prep. + Sust. / Adj.+ Adj./ Sust.',
  'prep. + Adj.',
  'prep. + infinitivo',
  'V + prep. a + Sust. objeto',
  'V + prep. a + Sust. + Sust.',
  'V + conj. y + verbo',
  'V + pron. encl.',
  'V + pron. + partícula',
  'V + CC',
  'V + suplemento',
  'V + CD + (compl.)',
  '`no´ + V + compl.',
  'V pronom. + pron. + compl.',
  'V + (prep.) + Sust.objeto',
  'V delex. + Sust. deverb.',
  'V [cop./pseudocop.] + atributo/ compl.',
  'Adv. / Sust. adverbializado + prep.',
  'Adv. + prep.',
  'Adv. comparativo + Sust.',
  'V + Adv.',
  'V(se) +',
  'V + prep. + det. + Sust.',
  'V + loc. adv []',
  'Adj. + loc. adv. []',
  'prep. a + art. el + Sust. + conj. y + prep. a + art. el + Sust.',
  'prep. de + Sust. + conj. y + prep de + Sust.',
  'prep. de + Sust. + conj. y + Sust.',
  'prep. por + art. la + Adj. + conj. y + prep. por + art. la + Adj.',
  'prep. a + Adj. + conj. y + prep. a + Sust.',
  'prep. a + Adj. + conj y + Adj.',
  'prep. por + adv. + conj. o + prep. por + adv.',
  'prep. a + adv. + conj. y + adv.',
  'prep. a + V + conj. y + (prep.) + V',
];
//Dominio Conceptual
const conceptualDomainDescriptorType = {
  name: 'Dominio conceptual',
  inputType: 'select',
  tab: 'GeneralDescription',
  multiInput: false,
  descriptors: new Array<mongoose.Types.ObjectId>(),
};
const conceptualDomainDescriptors = [
  'sin dominio conceptual',
  'antropónimo',
  'fitónimo',
  'somatismo',
  'zoomorfismo',
  'topónimo',
];
export const up = async () => {
  let descriptorsIDs: mongoose.Types.ObjectId[] = [];
  //Tipo de UF
  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    UfTypeDescriptors,
  );
  UfTypeDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', UfTypeDescriptorType);
  //Estructura de la UF
  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    UfStructureDescriptors,
  );
  UfStructureDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', UfStructureDescriptorType);
  //Dominio Conceptual
  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    conceptualDomainDescriptors,
  );
  conceptualDomainDescriptorType.descriptors = descriptorsIDs;
  await insertDocument('descriptortypes', conceptualDomainDescriptorType);
};

export const down = async () => {
  console.log('Down migration GeneralDescription');
};
