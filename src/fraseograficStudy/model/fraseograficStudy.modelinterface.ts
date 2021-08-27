import { Document } from 'mongoose';
import { Dictionary } from 'src/dictionary/model/dictionary.modelinterface';

export interface FraseograficStudy extends Document {
  name: string;
  initYear: number;
  finalYear: number;
  dictionaries: string[];
  state: string;
}
