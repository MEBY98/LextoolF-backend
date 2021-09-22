import mongoose from 'mongoose';
import { toObjectId, toObjectIds } from '../../utils/utils';

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

// ElementSchema.pre<any>('save', function(next) {
//   this.generalDescription.conceptualDomain = toObjectId(
//     this.generalDescription.conceptualDomain,
//   );
//   this.generalDescription.tipo = toObjectId(this.generalDescription.tipo);
//   this.generalDescription.structure = toObjectId(
//     this.generalDescription.structure,
//   );

//   this.orderLemma.order = toObjectIds(this.orderLemma.order);
//   this.orderLemma.criteriaOfLematization = toObjectIds(
//     this.orderLemma.criteriaOfLematization,
//   );
//   this.orderLemma.formalStructure = toObjectIds(
//     this.orderLemma.formalStructure,
//   );
//   this.orderLemma.ubicationOfContorno = toObjectId(
//     this.orderLemma.ubicationOfContorno,
//   );
//   this.orderLemma.typeOfVariant = toObjectIds(this.orderLemma.typeOfVariant);
//   this.orderLemma.formatOfVariant = toObjectIds(
//     this.orderLemma.formatOfVariant,
//   );
//   this.orderLemma.tipographyOfVariant = toObjectIds(
//     this.orderLemma.tipographyOfVariant,
//   );

//   for (let UIindex = 0; UIindex < this.useInformation.length; UIindex++) {
//     const UI = this.useInformation[UIindex];
//     UI.position = toObjectId(UI.position);
//     UI.format = toObjectId(UI.format);
//     UI.tipography = toObjectId(UI.tipography);
//   }

//   for (let CDindex = 0; CDindex < this.contornoDefinition.length; CDindex++) {
//     const CD = this.contornoDefinition[CDindex];
//     CD.typeOfDefinition = toObjectId(CD.typeOfDefinition);
//     CD.argumentalSchema = toObjectId(CD.argumentalSchema);
//     CD.relationship = toObjectIds(CD.relationship);
//     CD.typeOfContorno = toObjectIds(CD.typeOfContorno);
//     CD.positionOfContorno = toObjectIds(CD.positionOfContorno);
//     CD.formatOfContorno = toObjectIds(CD.formatOfContorno);
//   }

//   this.example.formatOfExample = toObjectIds(this.example.formatOfExample);
//   this.example.functionOfExample = toObjectIds(this.example.functionOfExample);
//   this.example.typeOfExample = toObjectId(this.example.typeOfExample);

//   this.typeOfRelationship = toObjectId(this.typeOfRelationship);
//   this.formOfPresentation = toObjectIds(this.formOfPresentation);
//   this.position = toObjectIds(this.position);

//   next();
// });
