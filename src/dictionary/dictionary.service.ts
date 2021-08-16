import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose } from 'mongoose';
import { Dictionary } from './model/dictionary.modelinterface';
import {
  NewDictionaryType,
  DictionaryType,
  EditDictionaryInputType,
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
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'UFs',
          model: 'UF',
        },
        // populate: {
        //   path: 'elements',
        //   model: 'Element',
        //   populate: {
        //     path: 'ubication',
        //     model: 'Ubication',
        //   },
        // },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'lemma',
          model: 'Lemma',
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'sublemmas',
          model: 'Sublemma',
        },
      });
  }

  async findByID(dictionaryID: string) {
    const d = await this.DictionaryModel.findById(dictionaryID)
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'UFs',
          model: 'UF',
          populate: {
            path: 'ubication',
            model: 'Ubication',
          },
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'UFs',
          model: 'UF',
          populate: {
            path: 'generalDescription',
            model: 'Descriptor',
          },
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'UFs',
          model: 'UF',
          populate: {
            path: 'useInformation.descriptors',
            model: 'Descriptor',
          },
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'UFs',
          model: 'UF',
          populate: {
            path: 'orderLemma',
            model: 'Descriptor',
          },
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'UFs',
          model: 'UF',
          populate: {
            path: 'ContornoDefinition.definition.descriptors.typeOfDefinition',
            model: 'Descriptor',
          },
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'UFs',
          model: 'UF',
          populate: {
            path: 'ContornoDefinition.definition.descriptors.relationship',
            model: 'Descriptor',
          },
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'UFs',
          model: 'UF',
          populate: {
            path: 'ContornoDefinition.contorno.descriptors',
            model: 'Descriptor',
          },
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'UFs',
          model: 'UF',
          populate: {
            path: 'example.typeOfExample',
            model: 'Descriptor',
          },
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'UFs',
          model: 'UF',
          populate: {
            path: 'example.formatOfExample',
            model: 'Descriptor',
          },
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'UFs',
          model: 'UF',
          populate: {
            path: 'example.functionOfExample',
            model: 'Descriptor',
          },
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'UFs',
          model: 'UF',
          populate: {
            path: 'paradigmaticInfo',
            model: 'Descriptor',
          },
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'lemma',
          model: 'Lemma',
          populate: {
            path: 'clasification',
            model: 'Clasification',
          },
        },
      })
      .populate({
        path: 'entries',
        model: 'Entry',
        populate: {
          path: 'sublemmas',
          model: 'Sublemma',
          populate: {
            path: 'clasification',
            model: 'Clasification',
          },
        },
      })
      .exec();
    console.log('DictionaryService.findByID.ufs:', d.entries);
    console.log('DictionaryService.findByID:', d);
    return d;
  }

  createDictionary(newDictionary: NewDictionaryType) {
    const {
      name,
      author,
      letters,
      shortName,
      reference,
      annoOfPublication,
      entries,
    } = newDictionary;
    const d = new this.DictionaryModel({
      name,
      author,
      letters,
      shortName,
      reference,
      annoOfPublication,
      entries,
    });
    d.save();
    return d;
  }

  async deleteDictionaryByID(dictionaryID: string) {
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
    dictionaryID: string,
  ) {
    const d = await this.DictionaryModel.findById(dictionaryID);
    if (!d) {
      throw new Error('Dictionary dont exist');
    } else {
      const eModel = await this.EntryService.createEntry(newEntry);
      // const eModel = await this.EntryService.createEntry({
      //   letter: 'A',
      //   context: ['asd'],
      //   sublemmas: [
      //     { clasification: '60ff1a1d39107e251cffcf0a', sublemma: 'subl' },
      //   ],
      //   lemma: {
      //     lemma: 'pp',
      //     clasification: '60ff1a1d39107e251cffcf0a',
      //   },
      //   UFs: [
      //     {
      //       UF: 'UFaltair',
      //       ubication: '60ff1b0b39107e251cffcf17',
      //       orderLemma: [['6102da5711740c23f0b1648b']],
      //       paradigmaticInfo: ['6102da5711740c23f0b1648b'],
      //       useInformation: [
      //         {
      //           anotation: 'asdasd',
      //           descriptors: ['6102da5711740c23f0b1648b'],
      //         },
      //       ],
      //       generalDescription: [
      //         '6102da5711740c23f0b1648b',
      //         '6102da5711740c23f0b1648b',
      //         '6102da5711740c23f0b1648b',
      //       ],
      //       example: {
      //         anotation: 'aasd',
      //         formatOfExample: ['6102da5711740c23f0b1648b'],
      //         functionOfExample: ['6102da5711740c23f0b1648b'],
      //         typeOfExample: '6102da5711740c23f0b1648b',
      //       },
      //       ContornoDefinition: [
      //         {
      //           definition: {
      //             definition: 'asd',
      //             descriptors: {
      //               typeOfDefinition: '6102da5711740c23f0b1648b',
      //               relationship: ['6102da5711740c23f0b1648b'],
      //             },
      //           },
      //           contorno: {
      //             contorno: 'asd',
      //             descriptors: ['6102da5711740c23f0b1648b'],
      //           },
      //         },
      //       ],
      //     },
      //   ],
      // });
      d.entries.push(eModel.id);
      const updatedDictionary = await this.DictionaryModel.findByIdAndUpdate(
        dictionaryID,
        d,
      ).exec();
      console.log('Dictionary:', updatedDictionary);
      console.log('createEntryByDictionaryID:', eModel);
      return eModel;
    }
  }

  async deleteEntryByDictionaryID(dictionaryID: string, entryID: string) {
    const dictionary = await this.DictionaryModel.findById(dictionaryID).exec();
    if (dictionary) {
      dictionary.entries = dictionary.entries.filter(d => d != entryID);
      this.EntryService.deleteEntryByID(entryID);
      return true;
    } else {
      return false;
    }
  }

  async editDictionarie(newDictionary: EditDictionaryInputType) {
    let d = new this.DictionaryModel();
    if (newDictionary.id) {
      d = await this.DictionaryModel.findByIdAndUpdate(
        newDictionary.id,
        newDictionary as any,
      ).exec();
    } else {
      d = this.createDictionary({
        annoOfPublication: newDictionary.annoOfPublication,
        author: newDictionary.author,
        letters: newDictionary.letters,
        name: newDictionary.name,
        reference: newDictionary.reference,
        shortName: newDictionary.shortName,
        entries: newDictionary.entries,
      });
    }
    console.log('editDictionarie:', d);
    return d;
  }
}
