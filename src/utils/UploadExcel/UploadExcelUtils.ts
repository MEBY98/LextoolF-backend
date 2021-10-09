import { DictionaryType } from 'src/dictionary/type/dictionary.types';
import { NewElementType } from 'src/element/type/element.type';
import { Descriptor } from 'src/descriptor/model/descriptor.modelinterface';

export function getLemmasOfDictionary(dictionary: DictionaryType) {
  const lemmaList: string[] = [];
  for (
    let entryIndex = 0;
    entryIndex < dictionary.entries.length;
    entryIndex++
  ) {
    const entry = dictionary.entries[entryIndex];
    let isLemma = false;
    for (
      let elementIndex = 0;
      elementIndex < entry.elements.length && !isLemma;
      elementIndex++
    ) {
      const element = entry.elements[elementIndex];
      if (element.clasification.clasification === 'lema') {
        isLemma = true;
        lemmaList.push(element.element);
      }
    }
    if (!isLemma) {
      lemmaList.push(entry.elements[0].element);
    }
  }
  return lemmaList;
}

export function createNewElement(
  element: string,
  ubication: string,
  clasification: string,
  NoDescribeDescriptor: Descriptor,
): NewElementType {
  return {
    element: '<p>' + element + '</p>',
    ubication,
    clasification,
    generalDescription: {
      conceptualDomain: NoDescribeDescriptor.id,
      structure: NoDescribeDescriptor.id,
      tipo: NoDescribeDescriptor.id,
    },
    contornoDefinition: [
      {
        definition: '',
        typeOfDefinition: NoDescribeDescriptor.id,
        argumentalSchema: NoDescribeDescriptor.id,
        relationship: [NoDescribeDescriptor.id],
        contorno: '',
        typeOfContorno: [NoDescribeDescriptor.id],
        positionOfContorno: [NoDescribeDescriptor.id],
        formatOfContorno: [NoDescribeDescriptor.id],
      },
    ],
    example: {
      anotation: '',
      formatOfExample: [NoDescribeDescriptor.id],
      functionOfExample: [NoDescribeDescriptor.id],
      typeOfExample: [NoDescribeDescriptor.id],
    },
    orderLemma: {
      criteriaOfLematization: [NoDescribeDescriptor.id],
      formalStructure: [NoDescribeDescriptor.id],
      formatOfVariant: [NoDescribeDescriptor.id],
      order: [NoDescribeDescriptor.id],
      tipographyOfVariant: [NoDescribeDescriptor.id],
      typeOfVariant: [NoDescribeDescriptor.id],
      ubicationOfContorno: NoDescribeDescriptor.id,
    },
    paradigmaticInfo: {
      formOfPresentation: [NoDescribeDescriptor.id],
      position: [NoDescribeDescriptor.id],
      typeOfRelationship: NoDescribeDescriptor.id,
    },
    useInformation: [
      {
        anotation: '',
        position: NoDescribeDescriptor.id,
        format: NoDescribeDescriptor.id,
        tipography: NoDescribeDescriptor.id,
      },
      {
        anotation: '',
        position: NoDescribeDescriptor.id,
        format: NoDescribeDescriptor.id,
        tipography: NoDescribeDescriptor.id,
      },
      {
        anotation: '',
        position: NoDescribeDescriptor.id,
        format: NoDescribeDescriptor.id,
        tipography: NoDescribeDescriptor.id,
      },
      {
        anotation: '',
        position: NoDescribeDescriptor.id,
        format: NoDescribeDescriptor.id,
        tipography: NoDescribeDescriptor.id,
      },
      {
        anotation: '',
        position: NoDescribeDescriptor.id,
        format: NoDescribeDescriptor.id,
        tipography: NoDescribeDescriptor.id,
      },
      {
        anotation: '',
        position: NoDescribeDescriptor.id,
        format: NoDescribeDescriptor.id,
        tipography: NoDescribeDescriptor.id,
      },
      {
        anotation: '',
        position: NoDescribeDescriptor.id,
        format: NoDescribeDescriptor.id,
        tipography: NoDescribeDescriptor.id,
      },
      {
        anotation: '',
        position: NoDescribeDescriptor.id,
        format: NoDescribeDescriptor.id,
        tipography: NoDescribeDescriptor.id,
      },
      {
        anotation: '',
        position: NoDescribeDescriptor.id,
        format: NoDescribeDescriptor.id,
        tipography: NoDescribeDescriptor.id,
      },
      {
        anotation: '',
        position: NoDescribeDescriptor.id,
        format: NoDescribeDescriptor.id,
        tipography: NoDescribeDescriptor.id,
      },
    ],
  };
}
