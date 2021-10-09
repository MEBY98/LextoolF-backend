import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import {
  Authortype,
  NewAuthortype,
  EditedAuthorType,
  AuthorToEditType,
} from './type/author.type';

@Resolver()
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(() => [Authortype])
  getAllAuthors() {
    return this.authorService.findAll();
  }

  @Query(() => AuthorToEditType)
  getAuthorById(@Args('id') id: string) {
    return this.authorService.findById(id);
  }

  @Mutation(() => Authortype)
  createAuthor(@Args('newAuthor') newAuthor: NewAuthortype) {
    return this.authorService.create(newAuthor);
  }

  @Mutation(() => Authortype)
  editAuthor(@Args('editedAuthor') editedAuthor: EditedAuthorType) {
    return this.authorService.edit(editedAuthor);
  }
}
