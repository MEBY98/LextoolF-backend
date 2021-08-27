import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clasification } from './model/clasification.modelinterface';
import { NewClasificationtype } from './type/clasification.type';

@Injectable()
export class ClasificationService {
  constructor(
    @InjectModel('Clasification')
    private ClasificationModel: Model<Clasification>,
  ) {}

  async findAll() {
    return await this.ClasificationModel.find().exec();
  }

  createClasification(newClasification: NewClasificationtype) {
    return new this.ClasificationModel(newClasification)
      .save()
      .then(nc => {
        return nc;
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }
}
