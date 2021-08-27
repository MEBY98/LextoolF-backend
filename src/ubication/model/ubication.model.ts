import mongoose from 'mongoose';

export const UbicationSchema = new mongoose.Schema({
  ubication: {
    type: String,
    required: true,
  },
});
