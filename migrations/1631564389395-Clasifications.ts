import {
  insertDocument,
  getCollection,
  getDb,
} from '../src/utils/Migrations/mongoDbUtils';

const clasifications: string[] = [
  'ULS_sust.',
  'ULS_adj.',
  'ULS_verbo',
  'ULS_adv.',
  'ULS_pron.',
  'ULS_prep.',
  'CLNom.',
  'CLAdjet.',
  'CLVerb.',
  'CSNom.',
  'CSVerb.',
  'SNL',
  'SVL',
  'UF',
];
export const up = async () => {
  clasifications.forEach(async c => {
    await insertDocument('clasifications', { clasification: c });
  });
};

export const down = async () => {
  console.log('Down migration Clasifications');
};
