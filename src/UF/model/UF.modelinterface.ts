import { Document } from 'mongoose';

export interface UF extends Document {
  UF: string;
  clasifications: String[];
}
