import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entry } from './model/entry.modelinterface';
import { NewEntryType } from './type/entry.type';
import { UFService } from 'src/UF/UF.service';

@Injectable()
export class EntryService {
  constructor(
    @InjectModel('Entry') private EntryModel: Model<Entry>,
    private readonly UFService: UFService,
  ) {}

  async findAll() {
    const e = await this.EntryModel.find()
      .populate({
        path: 'UFs',
        model: 'UF',
        populate: {
          path: 'clasifications',
          model: 'Descriptor',
        },
      })
      .exec();
    return e;
  }

  async createEntry(entry: NewEntryType) {
    let UFsIDs = [];
    entry.UFs.forEach(element => {
      const newUF = this.UFService.createUF(element);
      UFsIDs.push(newUF.id);
    });
    console.log('ID de las nuevas UFs:', UFsIDs);
    const e = new this.EntryModel({
      letter: entry.letter,
      lemma: entry.lemma,
      context: entry.context,
      UFs: UFsIDs,
    });
    console.log('ready entry:', e);
    return await e.save();
  }

  async deleteEntryByID(entryID: String) {
    const e = await this.EntryModel.findById(entryID);
    if (!e) {
      throw new Error(`Entrada con id: ${entryID} no existe`);
    }
    return await e.deleteOne();
  }
}
