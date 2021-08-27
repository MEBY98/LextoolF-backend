import { Document } from 'mongoose';

export interface DictionaryInfo extends Document {
  name: string;
  siglas: string;
  author: string[];
  annoOfPublication: number;
  reference: string;
}
