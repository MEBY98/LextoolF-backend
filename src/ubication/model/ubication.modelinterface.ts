import { Document } from 'mongoose';

export interface Ubication extends Document {
  ubication: string;
  clasifications: string;
}
