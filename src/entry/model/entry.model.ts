import mongoose from 'mongoose';

export const EntrySchema = new mongoose.Schema({
  letter: {
    type: String,
    required: true,
  },
  context: {
    type: String,
    required: true,
  },
  lemma: {
    type: String,
    required: false,
    default: null,
  },
  UFs: {
    type: [mongoose.Schema.Types.ObjectId],
    default: null,
    ref: 'UF',
  },
});
