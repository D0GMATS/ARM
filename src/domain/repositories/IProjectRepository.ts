import { Project } from '../entities/Project';

export const IProjectRepositoryToken = Symbol('IProjectRepository');

export interface IProjectRepository {
  findById(id: string): Promise<Project | null>;
  findAll(): Promise<Project[]>;
  save(project: Project): Promise<void>;
  delete(id: string): Promise<void>;
}
