import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from './model/author.modelinterface';
import { NewAuthortype, EditedAuthorType } from './type/author.type';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel('Author')
    private AuthorModel: Model<Author>,
  ) {}

  findAll() {
    return this.AuthorModel.find()
      .exec()
      .then(allAuthor => allAuthor)
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  findById(id: string) {
    return this.AuthorModel.findById(id)
      .exec()
      .then(a => a);
  }

  create(newAuthor: NewAuthortype) {
    return new this.AuthorModel(newAuthor)
      .save()
      .then(a => {
        return a;
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  edit(editedAuthor: EditedAuthorType) {
    if (editedAuthor.id) {
      return this.AuthorModel.findById(editedAuthor.id)
        .exec()
        .then(oa => {
          oa.name = editedAuthor.name;
          oa.siglas = editedAuthor.siglas;
          return oa
            .save()
            .then(a => {
              return a;
            })
            .catch(e => {
              Logger.verbose(e);
              return e;
            });
        })
        .catch(e => {
          Logger.verbose(e);
          return e;
        });
    } else {
      return this.create(editedAuthor)
        .then(na => {
          return na;
        })
        .catch(e => {
          Logger.verbose(e);
          return e;
        });
    }
  }
}
