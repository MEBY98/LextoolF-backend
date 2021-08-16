import mongoose, { Document } from 'mongoose';

export interface UF extends Document {
  UF: string;
  ubication: string;
  generalDescription: string[];
  useInformation: [
    {
      anotation: string;
      descriptors: string[];
    },
  ];
  orderLemma: string[][];
  ContornoDefinition: [
    {
      definition: {
        definition: string;
        descriptors: {
          typeOfDefinition: string;
          relationship: string[];
        };
      };
      contorno: { contorno: string; descriptors: string[] };
    },
  ];
  example: {
    anotation: string;
    typeOfExample: string;
    formatOfExample: string[];
    functionOfExample: string[];
  };
  paradigmaticInfo: string[];
}
