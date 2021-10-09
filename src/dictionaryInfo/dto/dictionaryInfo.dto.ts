import { AuthorDto } from 'src/author/dto/author.dto';

export class DictionaryInfoDto {
  id: string;
  name: string;
  siglas: string;
  author: AuthorDto[];
  annoOfPublication: number;
  reference: string;
}
