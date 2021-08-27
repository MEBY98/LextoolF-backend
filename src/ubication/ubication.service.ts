import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ubication } from './model/ubication.modelinterface';
import { NewUbicationtype } from './type/ubication.type';

@Injectable()
export class UbicationService {
  constructor(
    @InjectModel('Ubication')
    private UbicationModel: Model<Ubication>,
  ) {}

  findAll() {
    return this.UbicationModel.find()
      .exec()
      .then(allUbications => {
        return allUbications;
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  findByID(ubicationID: string) {
    return this.UbicationModel.findById(ubicationID)
      .exec()
      .then(u => u);
  }

  createUbication(newUbication: NewUbicationtype) {
    return new this.UbicationModel(newUbication)
      .save()
      .then(nu => nu)
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }
}
