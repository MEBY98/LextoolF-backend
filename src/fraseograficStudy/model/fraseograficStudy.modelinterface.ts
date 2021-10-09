import { Document } from 'mongoose';

export interface FraseograficStudy extends Document {
  name: string;
  initYear: number;
  finalYear: number;
  dictionaries: string[];
  state: string;
}
