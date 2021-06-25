import mongoose from 'mongoose';

export const UFSchema = new mongoose.Schema({
  UF: {
    type: String,
    required: true,
  },
  clasifications: {
    type: [mongoose.Schema.Types.ObjectId],
    default: null,
    ref: 'Descriptor',
  },
});
