import {
  insertDocument,
  insertManyDescriptors,
} from '../src/utils/Migrations/mongoDbUtils';
import {
  UseInformationTemp,
  UseInformationDescriptorTypes,
  UseInformationFormatDescriptors,
  UseInformationPositionDescriptors,
  UseInformationTipographyDescriptors,
} from '../src/utils/Migrations/UseInformation';
import mongoose from 'mongoose';

export const up = async () => {
  const descriptorsTypesIDs: mongoose.Types.ObjectId[] = [];
  for (let iDt = 0; iDt < UseInformationDescriptorTypes.length; iDt++) {
    const dt = UseInformationDescriptorTypes[iDt];
    let descriptorsIDs: mongoose.Types.ObjectId[] = [];
    if (iDt === 1) {
      descriptorsIDs = await insertManyDescriptors(
        'descriptors',
        UseInformationPositionDescriptors,
      );
    }
    if (iDt === 2) {
      descriptorsIDs = await insertManyDescriptors(
        'descriptors',
        UseInformationFormatDescriptors,
      );
    }
    if (iDt === 3) {
      descriptorsIDs = await insertManyDescriptors(
        'descriptors',
        UseInformationTipographyDescriptors,
      );
    }
    dt.descriptors = descriptorsIDs;
    const ops = await insertDocument('descriptortypes', dt);
    console.log('descriptorsTypesIDs', descriptorsTypesIDs);
    descriptorsTypesIDs.push(ops);
  }
  UseInformationTemp.descriptorsTypes = descriptorsTypesIDs;
  await insertDocument('observations', UseInformationTemp);
};

export const down = async () => {
  console.log('Down migration UseInformationTemp');
};
