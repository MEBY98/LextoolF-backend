import * as mongoose from 'mongoose';

export const DescriptorSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});
