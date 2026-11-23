import { Project } from '@/domain/entities/Project';
import { ProjectNotFoundError } from '@/domain/errors/DomainErrors';
import { IProjectRepository } from '@/domain/repositories/IProjectRepository';

export class LoadProjectUseCase {
  constructor(private readonly projectRepo: IProjectRepository) {}

  async execute(projectId: string): Promise<Project> {
    const project = await this.projectRepo.findById(projectId);
    if (!project) {
      throw new ProjectNotFoundError(projectId);
    }
    return project;
  }

  async loadAll(): Promise<Project[]> {
    return this.projectRepo.findAll();
  }
}
