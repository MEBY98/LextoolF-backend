import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Element } from './model/element.modelinterface';
import { NewElementType, EditedElementType } from './type/element.type';

@Injectable()
export class ElementService {
  constructor(
    @InjectModel('Element')
    private ElementModel: Model<Element>,
  ) {}

  findAll() {
    return this.ElementModel.find()
      .exec()
      .then(allElements => allElements)
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  createAsync(newElement: NewElementType) {
    return new this.ElementModel(newElement)
      .save()
      .then(ne => {
        return ne
          .populate({ path: 'clasification', model: 'Clasification' })
          .populate({ path: 'ubication', model: 'Ubication' })
          .populate({ path: 'generalDescription.tipo', model: 'Descriptor' })
          .populate({
            path: 'generalDescription.structure',
            model: 'Descriptor',
          })
          .populate({
            path: 'generalDescription.conceptualDomain',
            model: 'Descriptor',
          })
          .populate({
            path: 'orderLemma.order',
            model: 'Descriptor',
          })
          .populate({
            path: 'orderLemma.formatOfVariant',
            model: 'Descriptor',
          })
          .execPopulate()
          .then(nePopulated => nePopulated)
          .catch(e => {
            Logger.verbose(e);
            return e;
          });
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  create(newElement: NewElementType) {
    const result = new this.ElementModel(newElement);
    result.save();
    return result;
  }

  async ubicationByElementID(id: string): Promise<any> {
    const element = await this.ElementModel.findById(id)
      .exec()
      .then(e => {
        return e
          .populate({ path: 'ubication', model: 'Ubication' })
          .execPopulate();
      });
    return element.ubication;
  }

  edit(editedElement: EditedElementType) {
    if (editedElement.id) {
      return this.ElementModel.findById(editedElement.id)
        .exec()
        .then(oldElement => {
          oldElement.element = editedElement.element;
          oldElement.generalDescription = editedElement.generalDescription;
          oldElement.orderLemma = editedElement.orderLemma;
          oldElement.useInformation = editedElement.useInformation;
          oldElement.contornoDefinition = editedElement.contornoDefinition;
          oldElement.example = editedElement.example;
          oldElement.paradigmaticInfo = editedElement.paradigmaticInfo;
          oldElement.save();
          return oldElement;
        })
        .catch(e => {
          Logger.verbose(e);
          return e;
        });
    } else {
      return this.create(editedElement);
      // .then(ne => ne)
      // .catch(e => {
      //   Logger.verbose(e);
      //   return e;
      // });
    }
  }

  delete(id: string) {
    return this.ElementModel.findByIdAndDelete(id)
      .exec()
      .then(deleted => (deleted ? true : false))
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }
}
