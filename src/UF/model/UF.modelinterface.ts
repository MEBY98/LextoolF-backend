import mongoose, { Document } from 'mongoose';

export interface GeneralDescription {
  type: string;
  structure: string;
  conceptualDomain: string;
}

export interface UseInformation {
  anotation: string;
  descriptors: {
    position: string;
    format: string;
    tipography: string;
  };
}

export interface OrderLemma {
  order: string[];
  criteriaOfLematization: string[];
  formalStructure: string[];
  ubicationOfContorno: string;
  typeOfVariant: string[];
  formatOfVariant: string[];
  tipographyOfVariant: string[];
}

export interface Definition {
  definition: string;
  descriptors: {
    typeOfDefinition: string;
    argumentalSchema: string;
    relationship: string[];
  };
}

export interface Contorno {
  contorno: string;
  descriptors: {
    typeOfContorno: string[];
    positionOfContorno: string[];
    formatOfContorno: string[];
  };
}
export interface ContornoDefinition {
  definition: Definition;
  contorno: Contorno;
}

export interface Example {
  anotation: string;
  typeOfExample: string[];
  formatOfExample: string[];
  functionOfExample: string[];
}

export interface ParadigmaticInfo {
  typeOfRelationship: string;
  formOfPresentation: string[];
  position: string[];
}

export interface UF extends Document {
  UF: string;
  ubication: string;
  generalDescription: GeneralDescription;
  useInformation: UseInformation[];
  orderLemma: OrderLemma;
  ContornoDefinition: ContornoDefinition[];
  example: Example;
  paradigmaticInfo: ParadigmaticInfo;
}
