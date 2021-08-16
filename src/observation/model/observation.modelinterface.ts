import { Document } from 'mongoose';

export interface Observation extends Document {
  name: string;
  tab: string;
  descriptorsTypes: string[];
}
