import { Document } from 'mongoose';

export interface GeneralDescription {
  tipo: string;
  structure: string;
  conceptualDomain: string;
}

export interface UseInformation {
  anotation: string;
  position: string;
  format: string;
  tipography: string;
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

export interface ContornoDefinition {
  definition: string;
  typeOfDefinition: string;
  argumentalSchema: string;
  relationship: string[];

  contorno: string;
  typeOfContorno: string[];
  positionOfContorno: string[];
  formatOfContorno: string[];
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

export interface Element extends Document {
  element: string;
  clasification: string;
  ubication: string;
  generalDescription: GeneralDescription;
  orderLemma: OrderLemma;
  useInformation: UseInformation[];
  contornoDefinition: ContornoDefinition[];
  example: Example;
  paradigmaticInfo: ParadigmaticInfo;
}
