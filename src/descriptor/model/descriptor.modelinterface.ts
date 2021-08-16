import { Document } from 'mongoose';

export interface Descriptor extends Document {
  description: string;
}
