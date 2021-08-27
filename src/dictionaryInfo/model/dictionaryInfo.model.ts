import mongoose from 'mongoose';

export const DictionaryInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  siglas: {
    type: String,
    required: true,
  },
  author: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  annoOfPublication: {
    type: Number,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
});
