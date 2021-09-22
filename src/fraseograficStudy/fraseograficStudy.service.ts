import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FraseograficStudy } from './model/fraseograficStudy.modelinterface';
import {
  NewfraseograficStudyType,
  EditedfraseograficStudyType,
} from './type/fraseograficStudy.types';
import { DictionaryService } from 'src/dictionary/dictionary.service';
import { DictionaryInfo } from 'src/dictionaryInfo/model/dictionaryInfo.modelinterface';
import { DictionaryType } from 'src/dictionary/type/dictionary.types';

@Injectable()
export class FraseograficStudyService {
  constructor(
    @InjectModel('fraseograficStudy')
    private fraseograficStudyModel: Model<FraseograficStudy>,
    private readonly dictionaryService: DictionaryService,
  ) {}

  async findall(): Promise<FraseograficStudy[]> {
    return this.fraseograficStudyModel
      .find()
      .populate({
        path: 'dictionaries',
        model: 'Dictionary',
        populate: {
          path: 'dictionaryInfo',
          model: 'DictionaryInfo',
          populate: {
            path: 'author',
            model: 'Author',
          },
        },
      })
      .exec()
      .then(allStudies => allStudies)
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  async findByID(studyID: string) {
    return this.fraseograficStudyModel
      .findById(studyID)
      .exec()
      .then(s => {
        return s
          .populate({
            path: 'dictionaries',
            model: 'Dictionary',
          })
          .execPopulate()
          .then(sPopulated => sPopulated)
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

  async createStudy(study: NewfraseograficStudyType) {
    const { name, dictionaries, state, initYear, finalYear } = study;
    const dictionariesIDs: string[] = [];

    dictionaries.forEach(d => {
      const nd = this.dictionaryService.createDictionary(d);
      dictionariesIDs.push(nd.id);
    });

    return new this.fraseograficStudyModel({
      name,
      initYear,
      finalYear,
      dictionaries: dictionariesIDs,
      state,
    })
      .save()
      .then(s => {
        return s
          .populate({
            path: 'dictionaries',
            model: 'Dictionary',
            populate: {
              path: 'dictionaryInfo',
              model: 'DictionaryInfo',
              populate: {
                path: 'author',
                model: 'Author',
              },
            },
          })
          .execPopulate()
          .then(sPopulated => sPopulated)
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

  async deleteStudy(studyID: string) {
    return this.fraseograficStudyModel
      .findByIdAndDelete(studyID)
      .exec()
      .then(deleted => (deleted ? true : false))
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  async editStudy(newStudy: EditedfraseograficStudyType) {
    return this.fraseograficStudyModel
      .findById(newStudy.id)
      .exec()
      .then(oldStudy => {
        const newDictionaries = newStudy.dictionaries;

        oldStudy.name = newStudy.name;
        oldStudy.state = newStudy.state;
        oldStudy.initYear = newStudy.initYear;
        oldStudy.finalYear = newStudy.finalYear;
        if (oldStudy.dictionaries.length > 0) {
          oldStudy.dictionaries.forEach(OD => {
            let found = false;
            let i = 0;
            for (; i < newDictionaries.length && !found; i++) {
              const ND = newDictionaries[i];
              if (ND.id) {
                if (ND.id.toString() === OD.toString()) {
                  found = true;
                  this.dictionaryService.editDictionarie(ND);
                }
              }
            }
            if (!found) {
              this.dictionaryService.deleteDictionaryByID(OD);
              oldStudy.dictionaries = oldStudy.dictionaries.filter(
                d => d != OD,
              );
            }
          });
        }
        for (let i = 0; i < newDictionaries.length; i++) {
          const nd = newDictionaries[i];
          if (!nd.id) {
            const createdDictionary = this.dictionaryService.createDictionary(
              nd,
            );
            oldStudy.dictionaries.push(createdDictionary.id);
          }
        }
        return oldStudy
          .save()
          .then(s => {
            return s
              .populate({
                path: 'dictionaries',
                model: 'Dictionary',
                populate: {
                  path: 'dictionaryInfo',
                  model: 'DictionaryInfo',
                  populate: {
                    path: 'author',
                    model: 'Author',
                  },
                },
              })
              .execPopulate()
              .then(sPopulated => sPopulated)
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
  }

  async dictionariesInfoByStuydID(studyID: string) {
    return this.fraseograficStudyModel
      .findById(studyID)
      .populate({
        path: 'dictionaries',
        model: 'Dictionary',
        populate: {
          path: 'dictionaryInfo',
          model: 'DictionaryInfo',
          populate: {
            path: 'author',
            model: 'Author',
          },
        },
      })
      .exec()
      .then(s => {
        const result = [];
        s.dictionaries.forEach(d => {
          result.push((d as any).dictionaryInfo);
        });
        return result;
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  // updatePeriod(study: FraseograficStudy, newDictionaryYear: number) {
  //   const years = study.period.split('-');
  //   let minYear = Number.parseInt(years[0]);
  //   let maxYear = Number.parseInt(years[1]);
  //   if (newDictionaryYear) {
  //     if (newDictionaryYear < minYear) {
  //       minYear = newDictionaryYear;
  //     }
  //     if (newDictionaryYear > maxYear) {
  //       maxYear = newDictionaryYear;
  //     }
  //     console.log(minYear, maxYear);
  //   }
  //   return minYear + '-' + maxYear;
  // }

  // updatePeriodOfStudy(study: FraseograficStudyType) {
  //   let minYear = 1000000;
  //   let maxYear = 0;
  //   if (study.dictionaries.length > 0) {
  //     if (study.dictionaries.length > 1) {
  //       study.dictionaries.forEach(element => {
  //         if (element.annoOfPublication < minYear) {
  //           minYear = element.annoOfPublication;
  //         }
  //         if (element.annoOfPublication > maxYear) {
  //           maxYear = element.annoOfPublication;
  //         }
  //       });
  //       return minYear + '-' + maxYear;
  //     } else {
  //       return study.dictionaries[0].annoOfPublication.toString();
  //     }
  //   } else {
  //     return '';
  //   }
  // }

  // transformStudy(study: EditfraseograficStudyType) {
  //   const dictionariesID = [];
  //   study.dictionaries.forEach(element => {
  //     dictionariesID.push(element.id);
  //   });
  //   const s = new this.fraseograficStudyModel({
  //     _id: study.id,
  //     name: study.name,
  //     period: study.period,
  //     state: study.state,
  //     dictionaries: dictionariesID,
  //   });
  //   return { newDictionaries: study.dictionaries, dictionariesID, s };
  // }
}
