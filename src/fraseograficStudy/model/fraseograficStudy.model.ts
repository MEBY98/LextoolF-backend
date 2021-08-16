import * as mongoose from 'mongoose';
import { Dictionary } from '../../dictionary/model/dictionary.modelinterface';

export const fraseograficStudySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  dictionaries: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Dictionary',
  },
  state: {
    type: String,
    default: 'Ejecucion',
  },
});
