import mongoose from 'mongoose';

export const EntrySchema = new mongoose.Schema({
  letter: {
    type: String,
    required: true,
  },
  context: {
    type: [String],
    required: true,
  },
  elements: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Element',
  },
});
