import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FraseograficStudy } from './model/fraseograficStudy.modelinterface';
import {
  NewfraseograficStudyType,
  FraseograficStudyType,
  EditfraseograficStudyType,
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
    private fraseograficStudyModel: Model<FraseograficStudy>,
    private readonly dictionaryService: DictionaryService,
  ) {}

  async findall(): Promise<FraseograficStudy[]> {
    const allStudies = await this.fraseograficStudyModel
      .find()
      .sort({ name: 'desc' })
      .populate({
        path: 'dictionaries',
        model: 'Dictionary',
      });
    console.log('findAll:', allStudies);
    return allStudies;
  }

  async findByID(studyID: string) {
    const s = await this.fraseograficStudyModel
      .findById(studyID)
      .populate({
        path: 'dictionaries',
        model: 'Dictionary',
      })
      .exec();
    console.log('StudyFindByID:', s);
    return s;
  }

  async createStudy(study: NewfraseograficStudyType) {
    const { name, dictionaries, state, period } = study;
    const dictionariesIDs: string[] = [];

    dictionaries.forEach(d => {
      const nd = this.dictionaryService.createDictionary(d);
      dictionariesIDs.push(nd.id);
    });

    const s = new this.fraseograficStudyModel({
      name: name,
      period: period,
      dictionaries: dictionariesIDs,
      state: state,
    });
    await s.save();
    const result = s
      .populate({
        path: 'dictionaries',
        model: 'Dictionary',
        populate: { path: 'entries', model: 'Entry' },
      })
      .execPopulate()
      .then(s => {
        console.log('createStudy:', s);
        return s;
      });
    return result;
  }

  async deleteStudy(studyID: string) {
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
    if (s.dictionaries.length > 0) {
      throw new Error('Study cannot be deleted, has dictionaries');
    }

    const deletedStudy = await s.deleteOne();
    console.log('deleteStudy:', deletedStudy);
    return deletedStudy;
  }

  async createDictionaryByStudyID(
    newDictionary: NewDictionaryType,
    studyID: string,
  ) {
    const s = await this.fraseograficStudyModel.findById(studyID);
    if (!s) {
      throw new Error('Study dont exist');
    } else {
      const dModel = this.dictionaryService.createDictionary(newDictionary);
      s.dictionaries.push(dModel.id);
      // s.period = this.updatePeriod(s, dModel.annoOfPublication);
      await this.fraseograficStudyModel.findByIdAndUpdate(studyID, s).exec();
      await dModel.populate({
        path: 'entries',
        model: 'Entry',
      });
      console.log('createDictionaryByStudyID:', dModel);
      return dModel;
    }
  }

  async editStudy(newStudy: EditfraseograficStudyType) {
    const oldStudy = await this.fraseograficStudyModel
      .findById(newStudy.id)
      .exec();
    const newDictionaries = newStudy.dictionaries;

    if (oldStudy) {
      oldStudy.name = newStudy.name;
      oldStudy.state = newStudy.state;
      oldStudy.period = newStudy.period;
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
      newDictionaries.forEach(async nD => {
        if (oldStudy.dictionaries.includes(nD.id)) {
          this.dictionaryService.editDictionarie(nD);
        } else {
          const createdDictionary = await this.dictionaryService.editDictionarie(
            nD,
          );
          oldStudy.dictionaries.push(createdDictionary.id);
        }
      });
      oldStudy.save();
      await oldStudy
        .populate({
          path: 'dictionaries',
          model: 'Dictionary',
        })
        .execPopulate();
      console.log('editStudy:', oldStudy);
      return oldStudy;
    } else {
      throw new Error('No existe el Estudio');
    }
  }

  updatePeriod(study: FraseograficStudy, newDictionaryYear: number) {
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

  updatePeriodOfStudy(study: FraseograficStudyType) {
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

  transformStudy(study: EditfraseograficStudyType) {
    const dictionariesID = [];
    study.dictionaries.forEach(element => {
      dictionariesID.push(element.id);
    });
    const s = new this.fraseograficStudyModel({
      _id: study.id,
      name: study.name,
      period: study.period,
      state: study.state,
      dictionaries: dictionariesID,
    });
    return { newDictionaries: study.dictionaries, dictionariesID, s };
  }
}
