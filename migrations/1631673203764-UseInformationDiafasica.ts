import {
  insertDocument,
  insertManyDescriptors,
} from '../src/utils/Migrations/mongoDbUtils';
import {
  UseInformationDiafasica,
  UseInformationDescriptorTypes,
  UseInformationPositionDescriptors,
  UseInformationFormatDescriptors,
  UseInformationTipographyDescriptors,
} from '../src/utils/Migrations/UseInformation';
import mongoose from 'mongoose';

export const up = async () => {
  const descriptorsTypesIDs: mongoose.Types.ObjectId[] = [];
  let ops = [];
  let descriptorsIDs: mongoose.Types.ObjectId[] = [];
  UseInformationDescriptorTypes[0].descriptors = [];
  ops = await insertDocument(
    'descriptortypes',
    UseInformationDescriptorTypes[0],
  );
  descriptorsTypesIDs.push(ops[0]._id);

  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    UseInformationPositionDescriptors,
  );
  UseInformationDescriptorTypes[1].descriptors = descriptorsIDs;
  ops = await insertDocument(
    'descriptortypes',
    UseInformationDescriptorTypes[1],
  );
  descriptorsTypesIDs.push(ops[0]._id);

  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    UseInformationFormatDescriptors,
  );
  UseInformationDescriptorTypes[2].descriptors = descriptorsIDs;
  ops = await insertDocument(
    'descriptortypes',
    UseInformationDescriptorTypes[2],
  );
  descriptorsTypesIDs.push(ops[0]._id);

  descriptorsIDs = await insertManyDescriptors(
    'descriptors',
    UseInformationTipographyDescriptors,
  );
  UseInformationDescriptorTypes[3].descriptors = descriptorsIDs;
  ops = await insertDocument(
    'descriptortypes',
    UseInformationDescriptorTypes[3],
  );
  descriptorsTypesIDs.push(ops[0]._id);

  UseInformationDiafasica.descriptorsTypes = descriptorsTypesIDs;
  await insertDocument('observations', UseInformationDiafasica);
};

export const down = async () => {
  console.log('Down migration UseInformationDiafasica');
};
