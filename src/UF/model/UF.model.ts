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
    type: {
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Descriptor',
      },
      structure: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Descriptor',
      },
      conceptualDomain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Descriptor',
      },
    },
  },
  useInformation: {
    type: [
      {
        anotation: {
          type: String,
        },
        descriptors: {
          type: {
            position: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Descriptor',
            },
            format: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Descriptor',
            },
            tipography: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Descriptor',
            },
          },
        },
      },
    ],
  },
  orderLemma: {
    type: {
      order: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
      },
      criteriaOfLematization: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
      },
      formalStructure: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
      },
      ubicationOfContorno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Descriptor',
      },
      typeOfVariant: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
      },
      formatOfVariant: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
      },
      tipographyOfVariant: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
      },
    },
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
              argumentalSchema: {
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
              type: {
                typeOfContorno: {
                  type: [mongoose.Schema.Types.ObjectId],
                  ref: 'Descriptor',
                },
                positionOfContorno: {
                  type: [mongoose.Schema.Types.ObjectId],
                  ref: 'Descriptor',
                },
                formatOfContorno: {
                  type: [mongoose.Schema.Types.ObjectId],
                  ref: 'Descriptor',
                },
              },
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
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
      },
      formatOfExample: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
      },
      functionOfExample: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
      },
    },
  },
  paradigmaticInfo: {
    type: {
      typeOfRelationship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Descriptor',
      },
      formOfPresentation: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
      },
      position: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
      },
    },
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
