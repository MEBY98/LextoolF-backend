import { insertDocument } from '../src/utils/Migrations/mongoDbUtils';

export const up = async () => {
  await insertDocument('descriptors', { description: '<No aplica>' });
  await insertDocument('descriptors', { description: '<No descrito>' });
};

export const down = async () => {
  console.log('Down migration NoApplyDescriptor');
};
