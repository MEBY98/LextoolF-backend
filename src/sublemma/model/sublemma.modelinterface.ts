import { Document } from 'mongoose';

export interface Sublemma extends Document {
  sublemma: string;
  clasification: string;
  //   descriptors: String[];
}
