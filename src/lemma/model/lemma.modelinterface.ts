import { Document } from 'mongoose';

export interface Lemma extends Document {
  lemma: string;
  clasification: string;
  // descriptors: String[];
}
