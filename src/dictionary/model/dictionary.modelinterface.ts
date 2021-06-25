import { Document } from 'mongoose';
import { Author } from './author.class';

export interface Dictionary extends Document {
  name: String;
  shortName: String;
  author: [Author];
  annoOfPublication: number;
  reference: String;
  letters: [String];
  entries: String[];
}
