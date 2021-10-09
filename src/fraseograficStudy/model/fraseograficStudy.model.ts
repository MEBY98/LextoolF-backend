import * as mongoose from 'mongoose';

export const fraseograficStudySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  initYear: {
    type: Number,
    required: true,
  },
  finalYear: {
    type: Number,
    required: true,
  },
  dictionaries: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Dictionary',
    default: [],
  },
  state: {
    type: String,
    default: 'Ejecución',
  },
});
