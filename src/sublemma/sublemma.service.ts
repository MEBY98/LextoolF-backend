import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sublemma } from './model/sublemma.modelinterface';
import { NewSublemmatype, EditedSublemmaType } from './type/sublemma.type';

@Injectable()
export class SublemmaService {
  constructor(
    @InjectModel('Sublemma') private SublemmaModel: Model<Sublemma>,
  ) {}

  createSublemma(newSublemma: NewSublemmatype) {
    const s = new this.SublemmaModel(newSublemma);
    s.save();
    return s;
  }

  updateSublemma(sublemma: EditedSublemmaType) {
    console.log('updateSublemma:', sublemma);
    return this.SublemmaModel.findByIdAndUpdate(sublemma.id, {
      sublemma: sublemma.sublemma,
      clasification: sublemma.clasification,
    }).exec();
  }

  deleteSublemma(sublemmaID: string) {
    return this.SublemmaModel.findByIdAndDelete(sublemmaID).exec();
  }
}
