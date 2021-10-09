import exceljs from 'exceljs';
import { ExcelError } from './ErrorsTypes';
export function validateSheets(
  sheets: exceljs.Worksheet[],
  letters: string[],
): ExcelError[] | boolean {
  const errors: ExcelError[] = [];
  for (let sheetsIndex = 0; sheetsIndex < sheets.length; sheetsIndex++) {
    const s = sheets[sheetsIndex];
    if (!letters.includes(s.name)) {
      errors.push(
        new ExcelError(
          'Letra',
          s.name,
          0,
          'No existe la letra en el diccionario',
        ),
      );
    }
  }
  if (errors.length > 0) {
    return errors;
  } else {
    return false;
  }
}
