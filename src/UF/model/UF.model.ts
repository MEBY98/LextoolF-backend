import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';
import { toObjectIds, toObjectId } from 'src/utils/utils';

export const UFSchema = new mongoose.Schema({
  UF: {
    type: String,
    required: true,
  },
  ubication: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Ubication',
  },
  generalDescription: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Descriptor',
  },
  useInformation: {
    type: [
      {
        anotation: {
          type: String,
        },
        descriptors: {
          type: [mongoose.Schema.Types.ObjectId],
          ref: 'Descriptor',
        },
      },
    ],
  },
  orderLemma: {
    type: [[mongoose.Schema.Types.ObjectId]],
    ref: 'Descriptor',
  },
  ContornoDefinition: {
    type: [
      {
        definition: {
          type: {
            definition: {
              type: String,
            },
            descriptors: {
              typeOfDefinition: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Descriptor',
              },
              relationship: {
                type: [mongoose.Schema.Types.ObjectId],
                ref: 'Descriptor',
              },
            },
          },
        },
        contorno: {
          type: {
            contorno: {
              type: String,
            },
            descriptors: {
              type: [mongoose.Schema.Types.ObjectId],
              ref: 'Descriptor',
            },
          },
        },
      },
    ],
  },
  example: {
    type: {
      anotation: {
        type: String,
      },
      typeOfExample: {
        type: mongoose.Types.ObjectId,
        ref: 'Descriptor',
      },
      formatOfExample: {
        type: [mongoose.Types.ObjectId],
        ref: 'Descriptor',
      },
      functionOfExample: {
        type: [mongoose.Types.ObjectId],
        ref: 'Descriptor',
      },
    },
  },
  paradigmaticInfo: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Descriptor',
  },
});

UFSchema.pre<any>('save', function(next) {
  this.example.formatOfExample = toObjectIds(this.example.formatOfExample);
  this.example.functionOfExample = toObjectIds(this.example.functionOfExample);
  this.example.typeOfExample = toObjectId(this.example.typeOfExample);

  for (let i = 0; i < this.ContornoDefinition.length; i++) {
    const contornoDefinition = this.ContornoDefinition[i];
    const descriptors = contornoDefinition.definition.descriptors;

    contornoDefinition.definition.descriptors.typeOfDefinition = toObjectId(
      descriptors.typeOfDefinition,
    );

    contornoDefinition.definition.descriptors.relationship = toObjectIds(
      descriptors.relationship,
    );

    contornoDefinition.contorno.descriptors = toObjectIds(
      contornoDefinition.contorno.descriptors,
    );
  }
  next();
});
