import { IProjectRepository } from '@/domain/repositories/IProjectRepository';

export class DeleteProjectUseCase {
  constructor(private readonly projectRepo: IProjectRepository) {}

  async execute(projectId: string): Promise<void> {
    await this.projectRepo.delete(projectId);
  }
}
