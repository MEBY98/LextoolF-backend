import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ubication } from './model/ubication.modelinterface';
import { NewUbicationtype } from './type/ubication.type';
import { UbicationDto } from './dto/ubication.dto';

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

  edit(ubication: UbicationDto) {
    return this.UbicationModel.findById(ubication.id)
      .then(u => {
        if (u) {
          u.ubication = ubication.ubication;
          return u
            .save()
            .then(uSaved => uSaved)
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
