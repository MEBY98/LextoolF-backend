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
  constructor(private readonly AuthorService: AuthorService) {}

  @Query(() => [Authortype])
  getAllAuthors() {
    return this.AuthorService.findAll();
  }

  @Query(() => AuthorToEditType)
  getAuthorById(@Args('id') id: string) {
    return this.AuthorService.findById(id);
  }

  @Mutation(() => Authortype)
  createAuthor(@Args('newAuthor') newAuthor: NewAuthortype) {
    return this.AuthorService.create(newAuthor);
  }

  @Mutation(() => Authortype)
  editAuthor(@Args('editedAuthor') editedAuthor: EditedAuthorType) {
    return this.AuthorService.edit(editedAuthor);
  }
}
