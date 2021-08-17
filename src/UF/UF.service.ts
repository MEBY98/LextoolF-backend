import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UF } from './model/UF.modelinterface';
import { NewUFtype, EditedUFType } from './type/UF.type';
import { UbicationService } from 'src/ubication/ubication.service';

@Injectable()
export class UFService {
  constructor(
    @InjectModel('UF') private UFModel: Model<UF>,
    private UbicationService: UbicationService,
  ) {}

  async getAllUFs() {
    const ufs = await this.UFModel.find().exec();
    console.log('ufs:', ufs);
    return ufs;
  }

  async findByID(UFID: string) {
    const uf = await this.UFModel.findById(UFID).exec();
    console.log('findByIDUF:', uf);
    return uf;
  }

  async ubicationByUFID(UFID: string) {
    const uf = await this.UFModel.findById(UFID).exec();
    const ubication = await this.UbicationService.findByID(uf.ubication);
    console.log('ubicationByUFID:', ubication);
    return ubication;
  }

  createUF(UF: NewUFtype) {
    // console.log('createUFNewUF:', UF);
    const u = new this.UFModel(UF);
    // for (let indexCD = 0; indexCD < u.ContornoDefinition.length; indexCD++) {
    //   u.ContornoDefinition[
    //     indexCD
    //   ].definition.descriptors.typeOfDefinition = new mongoose.Types.ObjectId(
    //     UF.ContornoDefinition[indexCD].definition.descriptors.typeOfDefinition,
    //   );
    //   for (
    //     let indexR = 0;
    //     indexR <
    //     u.ContornoDefinition[indexCD].definition.descriptors.relationship
    //       .length;
    //     indexR++
    //   ) {
    //     u.ContornoDefinition[indexCD].definition.descriptors.relationship[
    //       indexR
    //     ] = new mongoose.Types.ObjectId(
    //       UF.ContornoDefinition[indexCD].definition.descriptors.relationship[
    //         indexR
    //       ],
    //     );
    //   }

    //   for (
    //     let indexC = 0;
    //     indexC < u.ContornoDefinition[indexCD].contorno.descriptors.length;
    //     indexC++
    //   ) {
    //     u.ContornoDefinition[indexCD].contorno.descriptors[
    //       indexC
    //     ] = new mongoose.Types.ObjectId(
    //       UF.ContornoDefinition[indexCD].contorno.descriptors[indexC],
    //     );
    //   }
    // }

    // if (UF.example.typeOfExample !== undefined) {
    //   u.example.typeOfExample = new mongoose.Types.ObjectId(
    //     UF.example.typeOfExample,
    //   );
    // }

    // for (
    //   let indexFunctionE = 0;
    //   indexFunctionE < u.example.functionOfExample.length;
    //   indexFunctionE++
    // ) {
    //   u.example.functionOfExample[indexFunctionE] = new mongoose.Types.ObjectId(
    //     UF.example.functionOfExample[indexFunctionE],
    //   );
    // }

    // for (
    //   let indexFormatE = 0;
    //   indexFormatE < u.example.formatOfExample.length;
    //   indexFormatE++
    // ) {
    //   u.example.formatOfExample[indexFormatE] = new mongoose.Types.ObjectId(
    //     UF.example.formatOfExample[indexFormatE],
    //   );
    // }

    u.save();
    return u;
  }

  async updateUF(UF: EditedUFType) {
    const oldUF = await this.UFModel.findById(UF.id).exec();
    if (oldUF) {
      const {
        example,
        ubication,
        useInformation,
        orderLemma,
        generalDescription,
        ContornoDefinition,
        paradigmaticInfo,
      } = UF;
      oldUF.example = example;
      oldUF.ubication = ubication;
      oldUF.useInformation = useInformation;
      oldUF.orderLemma = orderLemma;
      oldUF.generalDescription = generalDescription;
      oldUF.ContornoDefinition = ContornoDefinition;
      oldUF.paradigmaticInfo = paradigmaticInfo;
      return await oldUF.save();
    } else {
      throw new Error('UF dont exist');
    }
  }

  async deleteUF(UFID: string) {
    return await this.UFModel.findByIdAndDelete(UFID).exec();
  }
}
