import mongoose from 'mongoose';

export const ClasificationtSchema = new mongoose.Schema({
  clasification: {
    type: String,
    required: true,
  },
  // descriptors: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   default: null,
  // },
});
