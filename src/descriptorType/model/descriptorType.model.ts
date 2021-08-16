import * as mongoose from 'mongoose';

export const DescriptorTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tab: {
    type: String,
    default: '',
  },
  descriptors: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Descriptor',
  },
  inputType: {
    type: String,
    required: true,
  },
  multiInput: {
    type: Boolean,
    default: false,
  },
});
