import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lemma } from './model/lemma.modelinterface';
import { NewLemmatype, EditedLemmaType } from './type/lemma.type';
import { nullError } from 'src/utils/error';

@Injectable()
export class LemmaService {
  constructor(@InjectModel('Lemma') private LemmaModel: Model<Lemma>) {}

  async createLemma(newLemma: NewLemmatype) {
    if (newLemma.clasification === '') {
      nullError('lemma.Clasification', 'createLemma');
    }
    return new this.LemmaModel(newLemma).save();
  }

  async updateLemma(lemma: EditedLemmaType) {
    return await this.LemmaModel.findByIdAndUpdate(lemma.id, lemma).exec();
  }
}
