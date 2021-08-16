import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DescriptorType } from './model/descriptorType.modelinterface';
import {
  NewDescriptorTypeType,
  DescriptorTypeType,
} from './type/descriptorType.types.dto';
import { DescriptorService } from 'src/descriptor/descriptor.service';
import { NewDescriptorType } from 'src/descriptor/type/descriptor.types.dto';

@Injectable()
export class DescriptorTypeService {
  constructor(
    @InjectModel('DescriptorType')
    private DescriptorTypeModel: Model<DescriptorType>,
    private readonly DescriptorService: DescriptorService,
  ) {}

  async findAll() {
    const dts = await this.DescriptorTypeModel.find()
      .populate({ path: 'descriptors', model: 'Descriptor' })
      .exec();
    console.log('findallDescriptorsTypes:', dts);
    return dts;
  }

  async findAllGeneralDescriptionDescriptorsTypes() {
    const dts = await this.DescriptorTypeModel.find({
      tab: 'GeneralDescription',
    })
      .populate({ path: 'descriptors', model: 'Descriptor' })
      .exec();
    console.log('findAllGeneralDescriptionDescriptorsTypes:', dts);
    return dts;
  }

  async findAllDefinitionDescriptorsTypes() {
    const dts = await this.DescriptorTypeModel.find({
      tab: 'Definition',
    })
      .populate({ path: 'descriptors', model: 'Descriptor' })
      .exec();
    console.log('findAllDefinitionDescriptorsTypes:', dts);
    return dts;
  }
  async findAllContornoDescriptorsTypes() {
    const dts = await this.DescriptorTypeModel.find({
      tab: 'Contorno',
    })
      .populate({ path: 'descriptors', model: 'Descriptor' })
      .exec();
    console.log('findAllContornoDescriptorsTypes:', dts);
    return dts;
  }

  async findAllExampleDescriptorsTypes() {
    const dts = await this.DescriptorTypeModel.find({
      tab: 'Example',
    })
      .populate({ path: 'descriptors', model: 'Descriptor' })
      .exec();
    console.log('findAllExampleDescriptorsTypes:', dts);
    return dts;
  }

  async findAllParadigmaticInfoDescriptorsTypes() {
    const dts = await this.DescriptorTypeModel.find({
      tab: 'ParadigmaticInfo',
    })
      .populate({ path: 'descriptors', model: 'Descriptor' })
      .exec();
    console.log('findAllParadigmaticInfoDescriptorsTypes:', dts);
    return dts;
  }

  createDescriptorType(NewDescriptorType: NewDescriptorTypeType) {
    const descriptorIDs = [];

    if (NewDescriptorType.descriptors) {
      if (NewDescriptorType.descriptors.length > 0) {
        NewDescriptorType.descriptors.forEach(element => {
          const nd = this.DescriptorService.createDescriptor(element);
          descriptorIDs.push(nd.id);
        });
      }
    }

    const dt = new this.DescriptorTypeModel({
      descriptors: descriptorIDs,
      inputType: NewDescriptorType.inputType,
      name: NewDescriptorType.name,
      multiInput: NewDescriptorType.multiInput,
      tab: NewDescriptorType.tab,
    });
    dt.save();
    console.log('createDescriptorType:', dt);
    return dt;
  }

  async createDescriptorByDescriptorType(
    descriptorTypeID: string,
    descriptor: NewDescriptorType,
  ) {
    const dt = await this.DescriptorTypeModel.findById(descriptorTypeID);
    if (!dt) {
      throw new Error('Descriptor Type dont exist');
    } else {
      const dModel = this.DescriptorService.createDescriptor(descriptor);
      dt.descriptors.push(dModel.id);

      await this.DescriptorTypeModel.findByIdAndUpdate(
        descriptorTypeID,
        dt,
      ).exec();
      console.log('createDictionaryByStudyID:', dModel);
      return dModel;
    }
  }

  createManyDescriptorType(NewsDescriptorType: [NewDescriptorTypeType]) {
    const result = [];
    NewsDescriptorType.forEach(nd => {
      const ndModel = this.createDescriptorType(nd);
      result.push(ndModel);
    });
    return null;
  }
}
