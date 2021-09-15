type ErrorType = 'Celda vacía' | 'Valor no válido';
export class ExcelError {
  element: string;
  sheet: string;
  position: number;
  typeOfError: ErrorType;
  constructor(
    element: string,
    sheet: string,
    position: number,
    typeOfError: ErrorType,
  ) {
    this.element = element;
    this.sheet = sheet;
    this.position = position;
    this.typeOfError = typeOfError;
  }
}
