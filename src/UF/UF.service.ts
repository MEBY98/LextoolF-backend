import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UF } from './model/UF.modelinterface';
import { NewUFtype } from './type/UF.type';

@Injectable()
export class UFService {
  constructor(@InjectModel('UF') private UFModel: Model<UF>) {}

  createUF(UF: NewUFtype) {
    const u = new this.UFModel({
      UF: UF.UF,
      clasifications: UF.clasifications,
    });
    u.save();
    return u;
  }
}
