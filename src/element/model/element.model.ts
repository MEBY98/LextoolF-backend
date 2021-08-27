import mongoose from 'mongoose';
import { UbicationModule } from 'src/ubication/ubication.module';

export const ElementSchema = new mongoose.Schema({
  element: {
    type: String,
    required: true,
  },
  clasification: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Clasification',
  },
  ubication: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Ubication',
  },
  generalDescription: {
    type: {
      tipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Descriptor',
        default: null,
      },
      structure: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Descriptor',
        default: null,
      },
      conceptualDomain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Descriptor',
        default: null,
      },
    },
  },
  orderLemma: {
    type: {
      order: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
        default: [],
      },
      criteriaOfLematization: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
        default: [],
      },
      formalStructure: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
        default: [],
      },
      ubicationOfContorno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Descriptor',
        default: null,
      },
      typeOfVariant: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
        default: [],
      },
      formatOfVariant: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
        default: [],
      },
      tipographyOfVariant: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
        default: [],
      },
    },
  },
  useInformation: {
    type: [
      {
        anotation: {
          type: String,
          default: null,
        },
        position: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Descriptor',
          default: null,
        },
        format: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Descriptor',
          default: null,
        },
        tipography: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Descriptor',
          default: null,
        },
      },
    ],
  },
  contornoDefinition: {
    type: [
      {
        definition: {
          type: String,
          default: null,
        },
        typeOfDefinition: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Descriptor',
          default: null,
        },
        argumentalSchema: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Descriptor',
          default: null,
        },
        relationship: {
          type: [mongoose.Schema.Types.ObjectId],
          ref: 'Descriptor',
          default: [],
        },
        contorno: {
          type: String,
          default: null,
        },
        typeOfContorno: {
          type: [mongoose.Schema.Types.ObjectId],
          ref: 'Descriptor',
          default: [],
        },
        positionOfContorno: {
          type: [mongoose.Schema.Types.ObjectId],
          ref: 'Descriptor',
          default: [],
        },
        formatOfContorno: {
          type: [mongoose.Schema.Types.ObjectId],
          ref: 'Descriptor',
          default: [],
        },
      },
    ],
  },
  example: {
    type: {
      anotation: {
        type: String,
        default: null,
      },
      typeOfExample: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
        default: [],
      },
      formatOfExample: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
        default: [],
      },
      functionOfExample: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
        default: [],
      },
    },
  },
  paradigmaticInfo: {
    type: {
      typeOfRelationship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Descriptor',
        default: null,
      },
      formOfPresentation: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
        default: [],
      },
      position: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Descriptor',
        default: [],
      },
    },
  },
});
