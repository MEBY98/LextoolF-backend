import * as mongoose from 'mongoose';

export const DictionarySchema = new mongoose.Schema({
  dictionaryInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DictionaryInfo',
    required: true,
  },
  letters: { type: [String], required: true },
  entries: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Entry',
  },
});
