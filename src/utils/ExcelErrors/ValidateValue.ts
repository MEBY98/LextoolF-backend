import { ExcelError } from './ErrorsTypes';

type typeOfElement = 'Ubicación' | 'Clasificación';
export const validateExcelValue = (
  value: string,
  map: Map<string, string>,
  typeOfElement: typeOfElement,
  sheet: string,
  position: number,
): ExcelError | string => {
  if (!value) {
    return new ExcelError(typeOfElement, sheet, position, 'Celda vacía');
  }
  if (!map.get(value)) {
    return new ExcelError(typeOfElement, sheet, position, 'Valor no válido');
  }
  return value;
};
