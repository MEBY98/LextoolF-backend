import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './project.modelinterface';
import { NewProjectType, ProjectType } from './type/project.types.dto';

@Injectable()
export class ProjectService {

  constructor(@InjectModel('Project') private projectModel: Model<Project>) {}

  async findall(): Promise<Project[]> {
      return await this.projectModel.find().exec();
  }

  async createProject(p: NewProjectType): Promise<Project> {
    const newp = new this.projectModel(p);
      return await newp.save();
  }
}