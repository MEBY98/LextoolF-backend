import {
  insertDocument,
  getCollection,
} from '../src/utils/Migrations/mongoDbUtils';

export const up = async () => {
  await insertDocument('descriptors', { description: '<No aplica>' });
};

export const down = async () => {
  await (await getCollection('descriptors')).deleteOne({
    description: '<No aplica>',
  });
  console.log('Down migration NoApplyDescriptor');
};
