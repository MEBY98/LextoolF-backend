import { Document } from 'mongoose';
import { Dictionary } from 'src/dictionary/model/dictionary.modelinterface';

export interface fraseograficStudy extends Document {
  name: string;
  period: string;
  dictionaries: String[];
}
