import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clasification } from './model/clasification.modelinterface';
import { NewClasificationtype } from './type/clasification.type';
import { ClasificationDto } from './dto/clasification.dto';

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

  findByClasification(clasification: string) {
    return this.ClasificationModel.findOne({ clasification: clasification })
      .exec()
      .then(c => c.id)
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  edit(clasification: ClasificationDto) {
    return this.ClasificationModel.findById(clasification.id)
      .then(c => {
        if (c) {
          c.clasification = clasification.clasification;
          return c
            .save()
            .then(cSaved => cSaved)
            .catch(e => {
              Logger.verbose(e);
              return e;
            });
        }
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }
}
