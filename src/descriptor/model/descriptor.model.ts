import * as mongoose from 'mongoose';

export const DescriptorSchema = new mongoose.Schema({
  description: String,
  father: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'Descriptor',
  },
  root: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default: null,
    ref: 'Descriptor',
  },
  reference: {
    type: String,
    required: false,
    default: null,
  },
  projectID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'fraseograficStudy',
  },
});
