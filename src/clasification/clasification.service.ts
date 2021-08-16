import { Injectable } from '@nestjs/common';
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
    const c = new this.ClasificationModel(newClasification);
    c.save();
    return c;
  }
}
