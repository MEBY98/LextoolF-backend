import mongoose from 'mongoose';

export const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  siglas: {
    type: String,
    required: true,
  },
});
