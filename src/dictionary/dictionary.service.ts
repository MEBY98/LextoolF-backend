import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose } from 'mongoose';
import { Dictionary } from './model/dictionary.modelinterface';
import {
  NewDictionaryType,
  EditedDictionaryType,
} from './type/dictionary.types';
import { EntryService } from 'src/entry/entry.service';
import { NewEntryType } from 'src/entry/type/entry.type';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectModel('Dictionary') private DictionaryModel: Model<Dictionary>,
    private readonly EntryService: EntryService,
  ) {}

  async findAll() {
    return await this.DictionaryModel.find()
      .populate({
        path: 'dictionaryInfo',
        model: 'DictionaryInfo',
        populate: {
          path: 'author',
          model: 'Author',
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'elements',
          model: 'Element',
          populate: { path: 'clasification', model: 'Clasification' },
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'elements',
          model: 'Element',
          populate: { path: 'ubication', model: 'Ubication' },
        },
      })
      .exec()
      .then(allDictionaries => allDictionaries)
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  async findByID(dictionaryID: string) {
    return this.DictionaryModel.findById(dictionaryID)
      .populate({
        path: 'dictionaryInfo',
        model: 'DictionaryInfo',
        populate: {
          path: 'author',
          model: 'Author',
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'elements',
          model: 'Element',
          populate: { path: 'clasification', model: 'Clasification' },
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'elements',
          model: 'Element',
          populate: { path: 'ubication', model: 'Ubication' },
        },
      })
      .exec()
      .then(d => d)
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  createDictionary(newDictionary: NewDictionaryType) {
    const d = new this.DictionaryModel(newDictionary);
    d.save();
    return d;
  }

  async deleteDictionaryByID(dictionaryID: string) {
    return this.DictionaryModel.findByIdAndDelete(dictionaryID)
      .exec()
      .then(deleted => (deleted ? true : false))
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  async createEntryByDictionaryID(
    newEntry: NewEntryType,
    dictionaryID: string,
  ) {
    const d = await this.DictionaryModel.findById(dictionaryID).exec();
    const ne = this.EntryService.createEntry(newEntry);
    d.entries.push(ne.id);
    return d.save().then(() => {
      return this.findByID(dictionaryID).then(dFullPopulated => {
        return dFullPopulated.entries[dFullPopulated.entries.length - 1];
      });
    });
  }

  async deleteEntryByDictionaryID(dictionaryID: string, entryID: string) {
    return this.DictionaryModel.findById(dictionaryID)
      .exec()
      .then(d => {
        return this.EntryService.deleteEntryByID(entryID).then(deleted => {
          if (deleted) {
            d.entries = d.entries.filter(e => e != entryID);
            d.save();
            return true;
          } else {
            return false;
          }
        });
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  editDictionarie(newDictionary: EditedDictionaryType) {
    return this.DictionaryModel.findById(newDictionary.id)
      .exec()
      .then(d => {
        d.letters = newDictionary.letters;
        d.dictionaryInfo = newDictionary.dictionaryInfo;
        d.save();
        return d;
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }
}
