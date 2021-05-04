import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Descriptor } from './descriptor.modelinterface';
import { NewDescriptorType, DescriptorType } from './type/descriptor.types.dto';

@Injectable()
export class DescriptorService {

  constructor(@InjectModel('Descriptor') private DescriptorModel: Model<Descriptor>) { }

  async findall(): Promise<DescriptorType[]> {
    const descriptors = await this.DescriptorModel.find().exec()
    const tree = this.convertToTree(descriptors);
    return tree;
  }

  convertToTree(descriptors: Descriptor[]): any[] {
    let roots = [];
    descriptors.forEach(i => {
      if(i.father === null) {
        const index = descriptors.indexOf(i);
        const item = {
          id: String(i.id),
          father: i.father,
          type: i.type,
          reference: i.reference,
          description: i.description,
          projectID: i.projectID,
          descriptorsChild: []
        }    
        descriptors.splice(index,1);
        roots.push(item);        
      }
    });
    for (let i = 0; i < descriptors.length; i++) {
      const element = descriptors[i];      
      this.searchFather(element, roots)
    }    
    // console.log(roots[0].descriptorsChild[0]);
    return roots;
  }

  searchFather(descriptor: Descriptor, fathers: any[]){
    let result = false;    
    for (let i = 0; i < fathers.length; i++) {
      if(descriptor.father === fathers[i].id){
        fathers[i].descriptorsChild.push({
          id: String(descriptor.id),
          father: descriptor.father,
          type: descriptor.type,
          reference: descriptor.reference,
          description: descriptor.description,
          projectID: descriptor.projectID,
          descriptorsChild: []
        });
      }else{
        this.searchFather(descriptor, fathers[i].descriptorsChild);
      }       
    }
  }

  async createDescriptor(d: NewDescriptorType): Promise<Descriptor> {
    console.log(d)
    const newd = new this.DescriptorModel(d);
    console.log(newd)
    return await newd.save();
  }
}