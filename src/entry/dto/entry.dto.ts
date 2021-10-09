import { ElementDescriptorsAsStringDto } from 'src/element/dto/element.dto';

export class EntryDto {
  id: string;
  letter: string;
  context: string[];
  elements: ElementDescriptorsAsStringDto[];
}
