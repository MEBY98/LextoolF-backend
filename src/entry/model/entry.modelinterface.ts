import { Document } from 'mongoose';

export interface Entry extends Document {
  letter: String;
  contexto: String;
  lemma: String;
  UFs: String[];
}
