import * as mongoose from 'mongoose';
import { Author } from './author.class';

export const DictionarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  author: {
    type: [{ name: String, siglas: String }],
    required: true,
    default: null,
  },
  annoOfPublication: {
    type: Number,
    required: true,
    default: null,
  },
  reference: {
    type: String,
    required: true,
    default: null,
  },
  letters: { type: [String], required: true },
  entries: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Entry',
  },
});
