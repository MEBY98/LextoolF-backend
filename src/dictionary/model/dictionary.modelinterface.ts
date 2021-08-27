import { Document } from 'mongoose';

export interface Dictionary extends Document {
  dictionaryInfo: string;
  letters: string[];
  entries: string[];
}
