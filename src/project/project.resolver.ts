import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { of } from 'rxjs';
import { ProjectType, NewProjectType } from './type/project.types.dto';
;

@Resolver((of) => ProjectType)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [ProjectType])
  async getAllProjects(): Promise<ProjectType[]> {
      return this.projectService.findall();
  }

  @Mutation(() => ProjectType)
  async createProject(@Args('project') project: NewProjectType): Promise<ProjectType> {
      return this.projectService.createProject(project);
  }
}
