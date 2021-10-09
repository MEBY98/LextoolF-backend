import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DescriptorType } from './model/descriptorType.modelinterface';
import { NewDescriptorTypeType } from './type/descriptorType.types.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DescriptorService } from 'src/descriptor/descriptor.service';
import { NewDescriptorType } from 'src/descriptor/type/descriptor.types.dto';

@Injectable()
export class DescriptorTypeService {
  constructor(
    @InjectModel('DescriptorType')
    private DescriptorTypeModel: Model<DescriptorType>,
    private readonly DescriptorService: DescriptorService,
  ) {}

  findAll() {
    return this.DescriptorTypeModel.find()
      .populate({ path: 'descriptors', model: 'Descriptor' })
      .exec()
      .then(allDescriptors => {
        return allDescriptors;
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  findByTab(tab: string) {
    return this.DescriptorTypeModel.find({
      tab: tab,
    })
      .populate({ path: 'descriptors', model: 'Descriptor' })
      .exec()
      .then(async allDescriptors => {
        const noApplyDescriptor = await this.DescriptorService.findByDescription(
          '<No aplica>',
        );
        const noDescribeDescriptor = await this.DescriptorService.findByDescription(
          '<No descrito>',
        );
        allDescriptors.forEach(dt => {
          if (dt.inputType !== 'text') {
            dt.descriptors.push(noApplyDescriptor);
            dt.descriptors.push(noDescribeDescriptor);
          }
        });
        return allDescriptors;
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  createDescriptorTypeAsync(NewDescriptorType: NewDescriptorTypeType) {
    const descriptorIDs = [];
    NewDescriptorType.descriptors.forEach(element => {
      const nd = this.DescriptorService.createDescriptor(element);
      descriptorIDs.push(nd.id);
    });
    const { inputType, multiInput, name, tab } = NewDescriptorType;
    return new this.DescriptorTypeModel({
      inputType,
      multiInput,
      name,
      tab,
      descriptors: descriptorIDs,
    })
      .save()
      .then(nd => {
        return nd
          .populate({ path: 'descriptors', model: 'Descriptor' })
          .execPopulate();
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  createDescriptorType(NewDescriptorType: NewDescriptorTypeType) {
    const descriptorIDs = [];
    if (NewDescriptorType.descriptors) {
      NewDescriptorType.descriptors.forEach(element => {
        const nd = this.DescriptorService.createDescriptor(element);
        descriptorIDs.push(nd.id);
      });
    }
    const { inputType, multiInput, name, tab } = NewDescriptorType;
    const result = new this.DescriptorTypeModel({
      inputType,
      multiInput,
      name,
      tab,
      descriptors: descriptorIDs,
    });
    result.save();
    return result;
  }

  createDescriptorByDescriptorType(
    descriptorTypeID: string,
    descriptor: NewDescriptorType,
  ) {
    return this.DescriptorTypeModel.findById(descriptorTypeID)
      .then(dt => {
        if (!dt) {
          throw new Error('Descriptor Type dont exist');
        } else {
          const nd = this.DescriptorService.createDescriptor(descriptor);
          dt.descriptors.push(nd.id);
          dt.save()
            .then(editeddt => {
              return editeddt
                .populate({
                  path: 'descriptors',
                  model: 'Descriptor',
                })
                .execPopulate();
            })
            .catch(e => {
              Logger.verbose(e);
              return e;
            });
          return nd;
        }
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }
  deleteDescriptorByDescriptorType(
    descriptorTypeID: string,
    descriptorID: string,
  ) {
    return this.DescriptorTypeModel.findById(descriptorTypeID)
      .exec()
      .then(dt => {
        dt.descriptors = dt.descriptors.filter(d => d !== descriptorID);
        this.DescriptorService.deleteDescriptor(descriptorID);
        return dt
          .save()
          .then(dtsaved => {
            return dtsaved
              .populate({
                path: 'descriptors',
                model: 'Descriptor',
              })
              .execPopulate()
              .then(dtsavedpopulated => dtsavedpopulated);
          })
          .catch(e => e);
      })
      .catch(e => e);
  }
}
