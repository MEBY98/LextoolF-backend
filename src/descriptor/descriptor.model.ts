import * as mongoose from 'mongoose';

export const DescriptorSchema = new mongoose.Schema({
  description: String,
  father: {
    type: String,
    required: false,
    default: null
  },
  type: {
    type: String,
    required: false,
    default: null
  },
  reference: {
    type: String,
    required: false,
    default: null
  },
  projectID: String,
});
