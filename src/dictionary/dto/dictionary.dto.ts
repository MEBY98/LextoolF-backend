import { DictionaryInfoDto } from 'src/dictionaryInfo/dto/dictionaryInfo.dto';
import { EntryDto } from 'src/entry/dto/entry.dto';

export class DictionaryFullPopulated {
  id?: string;
  dictionaryInfo: DictionaryInfoDto;
  letters: string[];
  entries: EntryDto[];
}
