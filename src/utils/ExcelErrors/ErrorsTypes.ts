type ErrorType =
  | 'Celda vacía'
  | 'Valor no válido'
  | 'Imagen mal colocada'
  | 'Fila sin imagen';
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
