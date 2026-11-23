import { Project } from '@/domain/entities/Project';
import { IProjectRepository } from '@/domain/repositories/IProjectRepository';

export class InMemoryProjectRepository implements IProjectRepository {
  private projects = new Map<string, Project>();

  async findById(id: string): Promise<Project | null> {
    return this.projects.get(id) ?? null;
  }

  async findAll(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async save(project: Project): Promise<void> {
    this.projects.set(project.id, project);
  }

  async delete(id: string): Promise<void> {
    this.projects.delete(id);
  }
}
