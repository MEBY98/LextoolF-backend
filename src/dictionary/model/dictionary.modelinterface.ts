import { Document } from 'mongoose';
import { Author } from './author.class';

export interface Dictionary extends Document {
  name: string;
  shortName: string;
  author: Author[];
  annoOfPublication: number;
  reference: string;
  letters: string[];
  entries: string[];
}
