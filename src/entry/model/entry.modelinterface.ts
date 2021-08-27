import { Document } from 'mongoose';

export interface Entry extends Document {
  letter: string;
  context: string[];
  elements: string[];
}
