import mongoose from 'mongoose';

export const UbicationSchema = new mongoose.Schema({
  ubication: {
    type: String,
    required: true,
  },
  clasifications: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'Clasification',
  },
});
