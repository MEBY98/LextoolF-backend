import { Injectable } from '@nestjs/common';
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

  async findAll() {
    const allUbications = await this.UbicationModel.find()
      .populate({ path: 'clasifications', model: 'Clasification' })
      .exec();
    console.log('allubication', allUbications);
    return allUbications;
  }

  async findByID(ubicationID: string) {
    return await this.UbicationModel.findById(ubicationID).exec();
  }

  async findAllLemmaClasifications() {
    const Ubication = await this.UbicationModel.findOne({ ubication: 'Lema' })
      .populate({ path: 'clasifications', model: 'Clasification' })
      .exec();
    console.log('findAllLemmaClasifications', Ubication);
    return Ubication.clasifications;
  }

  async findAllSublemmaClasifications() {
    const Ubication = await this.UbicationModel.findOne({
      ubication: 'Sublema',
    })
      .populate({ path: 'clasifications', model: 'Clasification' })
      .exec();
    console.log('findAllSublemmaClasifications', Ubication);
    return Ubication.clasifications;
  }

  createUbication(newUbication: NewUbicationtype) {
    const u = new this.UbicationModel(newUbication);
    u.save();
    return u
      .populate({ path: 'clasifications', model: 'Clasification' })
      .execPopulate();
  }
}
