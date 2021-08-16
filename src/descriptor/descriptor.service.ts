import { Injectable } from '@nestjs/common';
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
    const ds = await this.DescriptorModel.find().exec();
    console.log('findallDescriptors:', ds);
    return ds;
  }

  createDescriptor(NewDescriptor: NewDescriptorType) {
    const d = new this.DescriptorModel(NewDescriptor);
    d.save();
    console.log('createdDescriptor:', d);
    return d;
  }
}

// convertToTree(descriptors: Descriptor[]): any[] {
//   let roots = [];
//   descriptors.forEach(i => {
//     if (i.father === null) {
//       const index = descriptors.indexOf(i);
//       const item = {
//         id: String(i.id),
//         father: i.father,
//         root: i.root,
//         description: i.description,
//         projectID: i.projectID,
//         descriptorsChild: [],
//       };
//       descriptors.splice(index, 1);
//       roots.push(item);
//     }
//   });
//   for (let i = 0; i < descriptors.length; i++) {
//     const element = descriptors[i];
//     this.searchFather(element, roots);
//   }
//   console.log(roots);
//   return roots;
// }

// searchFather(descriptor: Descriptor, fathers: any[]) {
//   let result = false;
//   for (let i = 0; i < fathers.length; i++) {
//     if (descriptor.father === fathers[i].id) {
//       fathers[i].descriptorsChild.push({
//         id: String(descriptor.id),
//         father: descriptor.father,
//         root: descriptor.root,
//         description: descriptor.description,
//         projectID: descriptor.projectID,
//         descriptorsChild: [],
//       });
//     } else {
//       this.searchFather(descriptor, fathers[i].descriptorsChild);
//     }
//   }
// }
