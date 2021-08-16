import * as mongoose from 'mongoose';

export const ObservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tab: {
    type: String,
    required: true,
  },
  descriptorsTypes: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'DescriptorType',
  },
});
