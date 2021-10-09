import { DictionaryFullPopulated } from 'src/dictionary/dto/dictionary.dto';

export class FraseograficStudyFullPopulated {
  id?: string;
  name: string;
  initYear: number;
  finalYear: number;
  state: string;
  dictionaries: [DictionaryFullPopulated];
}
