import { Document } from 'mongoose';
import { Dictionary } from 'src/dictionary/model/dictionary.modelinterface';

export interface FraseograficStudy extends Document {
  name: string;
  period: string;
  dictionaries: string[];
  state: string;
}
