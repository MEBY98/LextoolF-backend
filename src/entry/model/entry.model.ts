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
  sublemmas: {
    type: [mongoose.Schema.Types.ObjectId],
    default: null,
    ref: 'Sublemma',
  },
  lemma: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'Lemma',
  },
  UFs: {
    type: [mongoose.Schema.Types.ObjectId],
    default: null,
    ref: 'UF',
  },
});
