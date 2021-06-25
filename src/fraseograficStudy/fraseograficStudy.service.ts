import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { fraseograficStudy } from './model/fraseograficStudy.modelinterface';
import {
  NewfraseograficStudyType,
  CreatedfraseograficStudyType,
  fraseograficStudyType,
} from './type/fraseograficStudy.types';
import { Dictionary } from 'src/dictionary/model/dictionary.modelinterface';
import { DictionaryService } from 'src/dictionary/dictionary.service';
import {
  DictionaryType,
  NewDictionaryType,
} from 'src/dictionary/type/dictionary.types';
import { EntryService } from 'src/entry/entry.service';

@Injectable()
export class FraseograficStudyService {
  constructor(
    @InjectModel('fraseograficStudy')
    private fraseograficStudyModel: Model<fraseograficStudy>,
    private readonly dictionaryService: DictionaryService,
  ) {}

  async findall(): Promise<fraseograficStudy[]> {
    const allStudies = await this.fraseograficStudyModel
      .find()
      .sort({ name: 'desc' })
      .populate({
        path: 'dictionaries',
        model: 'Dictionary',
        populate: {
          path: 'entries',
          model: 'Entry',
          populate: {
            path: 'UFs',
            model: 'UF',
            populate: {
              path: 'clasifications',
              model: 'Descriptor',
            },
          },
        },
      });
    // console.log(allStudies);
    return allStudies;
  }

  async findByID(studyID: String) {
    const s = await this.fraseograficStudyModel
      .findById(studyID)
      .populate({
        path: 'dictionaries',
        model: 'Dictionary',
      })
      .exec();
    return s;
  }

  async createStudy(
    study: NewfraseograficStudyType,
  ): Promise<CreatedfraseograficStudyType> {
    const { name, dictionaries, shortName } = study;
    let dictionariesIds: String[] = [];
    let studyModel = new this.fraseograficStudyModel({
      name,
      shortName,
      dictionaries: dictionariesIds,
    });
    dictionaries.forEach(d => {
      const newDictionary = { ...d, studyID: studyModel.id };
      const dModel = this.dictionaryService.createDictionary(newDictionary);
      dictionariesIds.push(dModel.id);
    });
    studyModel.dictionaries = dictionariesIds;
    let minyear = 10000;
    let maxyear = 0;
    if (dictionaries.length === 1) {
      studyModel.period = dictionaries[0].annoOfPublication.toString();
    } else {
      dictionaries.forEach(element => {
        if (element.annoOfPublication < minyear) {
          minyear = element.annoOfPublication;
        }
        if (element.annoOfPublication > maxyear) {
          maxyear = element.annoOfPublication;
        }
      });
      studyModel.period = minyear.toString() + '-' + maxyear.toString();
    }

    return await studyModel.save();
  }

  async deleteStudy(studyID: String) {
    const s = await this.fraseograficStudyModel.findById(studyID).populate({
      path: 'dictionaries',
      model: 'Dictionary',
      populate: {
        path: 'entries',
        model: 'Entry',
      },
    });
    if (!s) {
      throw new Error('Study dont exist');
    }
    s.dictionaries.forEach(async dID => {
      this.dictionaryService.deleteDictionaryByID(dID);
    });
    const deletedStudy = await s.deleteOne();
    console.log(deletedStudy);
    return deletedStudy;
  }

  async createDictionaryByStudyID(
    newDictionary: NewDictionaryType,
    studyID: String,
  ) {
    const s = await this.fraseograficStudyModel.findById(studyID);
    if (!s) {
      throw new Error('Study dont exist');
    } else {
      const dModel = this.dictionaryService.createDictionary(newDictionary);
      s.dictionaries.push(dModel.id);
      s.period = this.updatePeriod(s, dModel.annoOfPublication);
      await this.fraseograficStudyModel.findByIdAndUpdate(studyID, s).exec();
      return dModel;
    }
  }

  async editStudy(newStudy: fraseograficStudyType) {
    let oldStudy = await this.fraseograficStudyModel
      .findById(newStudy.id)
      .exec();
    const { newDictionaries, dictionariesID, s } = this.transformStudy(
      newStudy,
    );
    if (oldStudy) {
      oldStudy.name = newStudy.name;
      oldStudy.shortName = newStudy.shortName;
      console.log('oldStudy:', oldStudy);
      console.log('newDictionaries:', newDictionaries);
      oldStudy.dictionaries.forEach(oD => {
        let found = false;
        let i = 0;
        for (; i < newDictionaries.length && !found; i++) {
          const element = newDictionaries[i];
          console.log('element.id:', element.id);
          console.log('oD:', oD);
          if (element.id == oD) {
            found = true;
            console.log('a');
          }
        }
        if (!found) {
          this.dictionaryService.deleteDictionaryByID(oD);
          oldStudy.dictionaries = oldStudy.dictionaries.filter(d => d != oD);
        }
      });
      newDictionaries.forEach(nD => {
        if (oldStudy.dictionaries.includes(nD.id)) {
          this.dictionaryService.editDictionarie(nD);
        } else {
          const createdDictionary = this.dictionaryService.createDictionary(nD);
          oldStudy.dictionaries.push(createdDictionary.id);
        }
      });
      oldStudy.period = this.updatePeriodOfStudy(newStudy);
      oldStudy.save();
      await oldStudy
        .populate({
          path: 'dictionaries',
          model: 'Dictionary',
        })
        .execPopulate();
      console.log('oldStudyAgain:', oldStudy);
      return oldStudy;
    } else {
      throw new Error('No existe el Estudio');
    }
  }

  updatePeriod(study: fraseograficStudy, newDictionaryYear: number) {
    const years = study.period.split('-');
    let minYear = Number.parseInt(years[0]);
    let maxYear = Number.parseInt(years[1]);
    if (newDictionaryYear) {
      if (newDictionaryYear < minYear) {
        minYear = newDictionaryYear;
      }
      if (newDictionaryYear > maxYear) {
        maxYear = newDictionaryYear;
      }
      console.log(minYear, maxYear);
    }
    return minYear + '-' + maxYear;
  }

  updatePeriodOfStudy(study: fraseograficStudyType) {
    let minYear = 1000000;
    let maxYear = 0;
    if (study.dictionaries.length > 0) {
      if (study.dictionaries.length > 1) {
        study.dictionaries.forEach(element => {
          if (element.annoOfPublication < minYear) {
            minYear = element.annoOfPublication;
          }
          if (element.annoOfPublication > maxYear) {
            maxYear = element.annoOfPublication;
          }
        });
        return minYear + '-' + maxYear;
      } else {
        return study.dictionaries[0].annoOfPublication.toString();
      }
    } else {
      return '';
    }
  }

  transformStudy(study: fraseograficStudyType) {
    let dictionariesID = [];
    study.dictionaries.forEach(element => {
      dictionariesID.push(element.id);
    });
    const s = new this.fraseograficStudyModel({
      _id: study.id,
      name: study.name,
      shortName: study.shortName,
      period: study.period,
      dictionaries: dictionariesID,
    });
    return { newDictionaries: study.dictionaries, dictionariesID, s };
  }
}
