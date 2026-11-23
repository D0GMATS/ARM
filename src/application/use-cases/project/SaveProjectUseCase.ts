import { Project } from '@/domain/entities/Project';
import { IProjectRepository } from '@/domain/repositories/IProjectRepository';

export class SaveProjectUseCase {
  constructor(private readonly projectRepo: IProjectRepository) {}

  async execute(project: Project): Promise<void> {
    await this.projectRepo.save(project);
  }
}
