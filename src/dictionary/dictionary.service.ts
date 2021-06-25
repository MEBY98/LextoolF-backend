import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dictionary } from './model/dictionary.modelinterface';
import {
  NewDictionaryType,
  DictionaryType,
  DictionaryTypeWithoutEntries,
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
    return await this.DictionaryModel.find().populate({
      path: 'entries',
      model: 'Entry',
      populate: {
        path: 'UFs',
        model: 'UF',
        // populate: {
        //   path: 'clasifications',
        //   model: 'Descriptor',
        // },
      },
    });
  }

  async findByID(dictionaryID: String) {
    return await this.DictionaryModel.findById(dictionaryID).populate({
      path: 'entries',
      model: 'Entry',
      populate: {
        path: 'UFs',
        model: 'UF',
        // populate: {
        //   path: 'clasifications',
        //   model: 'Descriptor',
        // },
      },
    });
  }

  createDictionary(newDictionary: NewDictionaryType) {
    const {
      name,
      author,
      letters,
      shortName,
      reference,
      annoOfPublication,
    } = newDictionary;
    const d = new this.DictionaryModel({
      name,
      author,
      letters,
      shortName,
      reference,
      annoOfPublication,
    });
    d.save();
    return d;
  }

  async deleteDictionaryByID(dictionaryID: String) {
    const d = await this.DictionaryModel.findById(dictionaryID);
    console.log('d:', d);
    if (!d) {
      throw new Error(`Diccionario con id ${dictionaryID} no existe`);
    } else {
      if (d.entries.length > 0) {
        d.entries.forEach(e => {
          this.EntryService.deleteEntryByID(e);
        });
      }
      d.deleteOne();
      return d;
    }
  }

  async createEntryByDictionaryID(
    newEntry: NewEntryType,
    dictionaryID: String,
  ) {
    const d = await this.DictionaryModel.findById(dictionaryID);
    if (!d) {
      throw new Error('Dictionary dont exist');
    } else {
      const eModel = await this.EntryService.createEntry(newEntry);
      d.entries.push(eModel.id);
      const updatedDictionary = await this.DictionaryModel.findByIdAndUpdate(
        dictionaryID,
        d,
      ).exec();
      console.log(updatedDictionary);
      return eModel.populate({
        path: 'UFs',
        model: 'UF',
      });
    }
  }

  editDictionarie(newDictionary: DictionaryTypeWithoutEntries) {
    this.DictionaryModel.findByIdAndUpdate(
      newDictionary.id,
      newDictionary,
    ).exec();
  }
}
