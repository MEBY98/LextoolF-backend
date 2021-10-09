import exceljs from 'exceljs';
import { ExcelError } from './ErrorsTypes';
export interface ExcelImage {
  type: 'image';
  imageId: string;
  range: exceljs.ImageRange;
}
export function validateImagePosition(
  actualImg: ExcelImage,
  beforeImg: ExcelImage,
  sheet: string,
): ExcelError | boolean {
  console.log('actualImg', actualImg);
  if (actualImg && beforeImg) {
    const actualImgInitRow = actualImg.range.tl.nativeRow;
    const beforeImgFinalRow = beforeImg.range.br.nativeRow;
    if (actualImgInitRow <= beforeImgFinalRow) {
      return new ExcelError(
        'Imagen',
        sheet,
        actualImgInitRow + 1,
        'Imagen mal colocada',
      );
    }
    if (actualImgInitRow - beforeImgFinalRow > 1) {
      return new ExcelError(
        'Imagen',
        sheet,
        actualImgInitRow,
        'Fila sin imagen',
      );
    }
  }
  return false;
}
