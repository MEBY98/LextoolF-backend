import mongoose from 'mongoose';

export const LemmaSchema = new mongoose.Schema({
  lemma: {
    type: String,
    required: true,
  },
  clasification: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Clasification',
  },
  // descriptors: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   required: true,
  // },
});
