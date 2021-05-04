import { Document } from 'mongoose';

export interface Descriptor extends Document {
  description: string,
  father: string,
  type: string,
  reference: string,
  projectID: string
}
