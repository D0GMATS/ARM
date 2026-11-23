import { Project } from '@/domain/entities/Project';
import { Panel } from '@/domain/entities/Panel';
import { Scheme } from '@/domain/entities/Scheme';
import { IProjectRepository } from '@/domain/repositories/IProjectRepository';

export interface CreateProjectCommand {
  name: string;
  description?: string;
}

export class CreateProjectUseCase {
  constructor(private readonly projectRepo: IProjectRepository) {}

  async execute(command: CreateProjectCommand): Promise<Project> {
    const projectId = `proj-${Date.now()}`;
    const panelId = `panel-${Date.now()}`;
    const schemeId = `scheme-${Date.now()}`;

    const defaultScheme = new Scheme(schemeId, panelId, 'Схема принципиальная 1');
    const defaultPanel = new Panel(panelId, projectId, 'ЩО-1', [defaultScheme]);
    const project = new Project(
      projectId,
      command.name.trim() || 'Новый проект',
      command.description ?? '',
      [defaultPanel]
    );

    await this.projectRepo.save(project);
    return project;
  }
}
