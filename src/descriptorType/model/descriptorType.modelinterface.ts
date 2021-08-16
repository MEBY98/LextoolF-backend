import { Document } from 'mongoose';

export interface DescriptorType extends Document {
  name: string;
  descriptors: string[];
  tab: string;
  inputType: string;
  multiInput: boolean;
}
