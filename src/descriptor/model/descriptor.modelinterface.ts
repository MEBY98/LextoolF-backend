import { Document } from 'mongoose';

export interface Descriptor extends Document {
  description: string;
  father: string;
  root: string;
  reference: string;
  projectID: string;
}
