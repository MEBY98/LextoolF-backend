import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DictionaryInfo } from './model/dictionaryInfo.modelinterface';
import {
  NewDictionaryInfotype,
  EditedDictionaryInfotype,
} from './type/dictionaryInfo.type';

@Injectable()
export class DictionaryInfoService {
  constructor(
    @InjectModel('DictionaryInfo')
    private DictionaryInfoModel: Model<DictionaryInfo>,
  ) {}

  findAll() {
    return this.DictionaryInfoModel.find()
      .populate({ path: 'author', model: 'Author' })
      .exec()
      .then(allDictionariesInfo => {
        Logger.verbose(allDictionariesInfo);
        return allDictionariesInfo;
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  findById(id: string) {
    return this.DictionaryInfoModel.findById(id)
      .exec()
      .then(dinfo => dinfo);
  }

  create(newDictionaryInfo: NewDictionaryInfotype) {
    return new this.DictionaryInfoModel(newDictionaryInfo)
      .save()
      .then(d => {
        return d
          .populate({ path: 'author', model: 'Author' })
          .execPopulate()
          .then(dPopulated => dPopulated)
          .catch(e => {
            Logger.verbose(e);
            return e;
          });
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  edit(editedDictionaryInfo: EditedDictionaryInfotype) {
    if (editedDictionaryInfo.id) {
      return this.DictionaryInfoModel.findById(editedDictionaryInfo.id)
        .exec()
        .then(oa => {
          oa.name = editedDictionaryInfo.name;
          oa.siglas = editedDictionaryInfo.siglas;
          oa.author = editedDictionaryInfo.author;
          oa.annoOfPublication = editedDictionaryInfo.annoOfPublication;
          oa.reference = editedDictionaryInfo.reference;
          return oa
            .save()
            .then(a => {
              return a
                .populate({ path: 'author', model: 'Author' })
                .execPopulate()
                .then(aPopulated => aPopulated)
                .catch(e => {
                  Logger.verbose(e);
                  return e;
                });
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
      return this.create(editedDictionaryInfo)
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
