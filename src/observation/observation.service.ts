import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async findByTab(tab: string) {
    return this.ObservationModel.find({
      tab: tab,
    })
      .populate({
        path: 'descriptorsTypes',
        model: 'DescriptorType',
        populate: { path: 'descriptors', model: 'Descriptor' },
      })
      .exec()
      .then(observations => {
        return observations;
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  createObservation(NewObservation: NewObservationType) {
    const descriptorTypesIDs = [];

    NewObservation.descriptorsTypes.forEach(element => {
      const ndt = this.DescriptorTypeService.createDescriptorType(element);
      descriptorTypesIDs.push(ndt.id);
    });

    const { tab, name } = NewObservation;
    return new this.ObservationModel({
      name,
      tab,
      descriptorsTypes: descriptorTypesIDs,
    })
      .save()
      .then(no => {
        return no
          .populate({
            path: 'descriptorsTypes',
            model: 'DescriptorType',
            populate: { path: 'descriptors', model: 'Descriptor' },
          })
          .execPopulate();
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }
}
