import mongoose from 'mongoose';

export const SublemmaSchema = new mongoose.Schema({
  sublemma: {
    type: String,
    required: true,
  },
  clasification: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Clasification',
  },
  //   descriptors: {
  //     type: [mongoose.Schema.Types.ObjectId],
  //     required: true,
  //   },
});
