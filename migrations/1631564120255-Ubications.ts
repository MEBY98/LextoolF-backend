import {
  insertDocument,
  getCollection,
  getDb,
} from '../src/utils/Migrations/mongoDbUtils';

const ubications: string[] = [
  'Lema',
  'Sublema',
  'Sublema integrado',
  'Enunciado definidor',
  'Comentario en la definición',
  'Ejemplo lexicográfico del lema',
  'Sinónimo',
  'Antónimo',
  'Remisión',
];
export const up = async () => {
  ubications.forEach(async u => {
    await insertDocument('ubications', { ubication: u });
  });
};

export const down = async () => {
  console.log('Down migration Ubications');
};
