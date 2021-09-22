import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observation } from './model/observation.modelinterface';
import { NewObservationType } from './type/observation.types.dto';
import { DescriptorTypeService } from 'src/descriptorType/descriptorType.service';
import { DescriptorService } from 'src/descriptor/descriptor.service';
import { DescriptorTypeType } from 'src/descriptorType/type/descriptorType.types.dto';

@Injectable()
export class ObservationService {
  constructor(
    @InjectModel('Observation')
    private ObservationModel: Model<Observation>,
    private readonly DescriptorTypeService: DescriptorTypeService,
    private readonly DescriptorService: DescriptorService,
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
      .then(async observations => {
        const noApplyDescriptor = await this.DescriptorService.findByDescription(
          '<No aplica>',
        );
        const noDescribeDescriptor = await this.DescriptorService.findByDescription(
          '<No descrito>',
        );
        observations.forEach(o => {
          o.descriptorsTypes.forEach(dt => {
            if ((dt as any).inputType !== 'text') {
              (dt as any).descriptors.push(noApplyDescriptor);
              (dt as any).descriptors.push(noDescribeDescriptor);
            }
          });
        });
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
