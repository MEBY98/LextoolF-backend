import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Descriptor } from './model/descriptor.modelinterface';
import { NewDescriptorType, DescriptorType } from './type/descriptor.types.dto';

@Injectable()
export class DescriptorService {
  constructor(
    @InjectModel('Descriptor') private DescriptorModel: Model<Descriptor>,
  ) {}

  async findAll() {
    return await this.DescriptorModel.find()
      .exec()
      .then(allDescriptors => {
        return allDescriptors;
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  findByDescription(description: string) {
    return this.DescriptorModel.findOne({ description: description })
      .exec()
      .then(d => d)
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }
  createDescriptor(NewDescriptor: NewDescriptorType) {
    const result = new this.DescriptorModel(NewDescriptor);
    result.save();
    return result;
  }
}
