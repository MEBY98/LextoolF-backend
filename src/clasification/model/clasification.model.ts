import mongoose from 'mongoose';

export const ClasificationSchema = new mongoose.Schema({
  clasification: {
    type: String,
    required: true,
  },
});
