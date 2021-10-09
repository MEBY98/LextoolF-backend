import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Element } from './model/element.modelinterface';
import { NewElementType, EditedElementType } from './type/element.type';
import { ClasificationService } from 'src/clasification/clasification.service';

@Injectable()
export class ElementService {
  constructor(
    @InjectModel('Element')
    private ElementModel: Model<Element>,
    private clasificationService: ClasificationService,
  ) {}

  async findAll() {
    const UF_ID = await this.clasificationService.findByClasification('UF');
    return this.ElementModel.find({ clasification: UF_ID })
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
        path: 'orderLemma.criteriaOfLematization',
        model: 'Descriptor',
      })
      .populate({
        path: 'orderLemma.formalStructure',
        model: 'Descriptor',
      })
      .populate({
        path: 'orderLemma.UbicationOfContorno',
        model: 'Descriptor',
      })
      .populate({
        path: 'orderLemma.TypeOfVariant',
        model: 'Descriptor',
      })
      .populate({
        path: 'orderLemma.formatOfVariant',
        model: 'Descriptor',
      })
      .populate({
        path: 'orderLemma.tipographyOfVariant',
        model: 'Descriptor',
      })
      .populate({
        path: 'useInformation.position',
        model: 'Descriptor',
      })
      .populate({
        path: 'useInformation.format',
        model: 'Descriptor',
      })
      .populate({
        path: 'useInformation.tipography',
        model: 'Descriptor',
      })
      .populate({
        path: 'contornoDefinition.typeOfDefinition',
        model: 'Descriptor',
      })
      .populate({
        path: 'contornoDefinition.argumentalSchema',
        model: 'Descriptor',
      })
      .populate({
        path: 'contornoDefinition.relationship',
        model: 'Descriptor',
      })
      .populate({
        path: 'contornoDefinition.typeOfContorno',
        model: 'Descriptor',
      })
      .populate({
        path: 'contornoDefinition.positionOfContorno',
        model: 'Descriptor',
      })
      .populate({
        path: 'contornoDefinition.formatOfContorno',
        model: 'Descriptor',
      })
      .populate({
        path: 'example.typeOfExample',
        model: 'Descriptor',
      })
      .populate({
        path: 'example.formatOfExample',
        model: 'Descriptor',
      })
      .populate({
        path: 'example.functionOfExample',
        model: 'Descriptor',
      })
      .populate({
        path: 'paradigmaticInfo.typeOfRelationship',
        model: 'Descriptor',
      })
      .populate({
        path: 'paradigmaticInfo.formOfPresentation',
        model: 'Descriptor',
      })
      .populate({
        path: 'paradigmaticInfo.position',
        model: 'Descriptor',
      })
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
