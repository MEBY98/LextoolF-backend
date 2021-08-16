import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DescriptorService } from 'src/descriptor/descriptor.service';
import { Observation } from './model/observation.modelinterface';
import { NewObservationType } from './type/observation.types.dto';
import { DescriptorTypeService } from 'src/descriptorType/descriptorType.service';

@Injectable()
export class ObservationService {
  constructor(
    @InjectModel('Observation')
    private ObservationModel: Model<Observation>,
    private readonly DescriptorTypeService: DescriptorTypeService,
  ) {}

  async findAllUseInformationObservations() {
    const os = await this.ObservationModel.find({
      tab: 'UseInformation',
    })
      .populate({
        path: 'descriptorsTypes',
        model: 'DescriptorType',
        populate: { path: 'descriptors', model: 'Descriptor' },
      })
      .exec();
    console.log('findAllUseInformationObservations:', os);
    return os;
  }

  async findAllOrderLemmaObservations() {
    const os = await this.ObservationModel.find({
      tab: 'OrderLemma',
    })
      .populate({
        path: 'descriptorsTypes',
        model: 'DescriptorType',
        populate: { path: 'descriptors', model: 'Descriptor' },
      })
      .exec();
    console.log('findAllUseInformationObservations:', os);
    return os;
  }

  createObservation(NewObservation: NewObservationType) {
    const descriptorTypesIDs = [];

    NewObservation.descriptorsTypes.forEach(element => {
      const ndt = this.DescriptorTypeService.createDescriptorType(element);
      descriptorTypesIDs.push(ndt.id);
    });
    const o = new this.ObservationModel({
      name: NewObservation.name,
      tab: NewObservation.tab,
      descriptorsTypes: descriptorTypesIDs,
    });
    o.save();
    console.log('createObservation:', o);
    return o;
  }
}
