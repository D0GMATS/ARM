import { Project } from '@/domain/entities/Project';
import { IProjectRepository } from '@/domain/repositories/IProjectRepository';
import { ProjectSerializer } from './ProjectSerializer';

const STORAGE_KEY = 'webcad_projects_fallback';

export class HttpProjectRepository implements IProjectRepository {
  async findById(id: string): Promise<Project | null> {
    try {
      const res = await fetch(`/api/projects/${id}`);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Failed to fetch project');
      const data = await res.json();
      return ProjectSerializer.fromJSON(data);
    } catch {
      const all = this.readFallback();
      return all.find((p) => p.id === id) ?? null;
    }
  }

  async findAll(): Promise<Project[]> {
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      return data.map(ProjectSerializer.fromJSON);
    } catch {
      return this.readFallback();
    }
  }

  async save(project: Project): Promise<void> {
    this.saveFallback(project);
    try {
      await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
    } catch {
      // Fallback already saved to localStorage
    }
  }

  async delete(id: string): Promise<void> {
    const all = this.readFallback().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    } catch {
      // Fallback already updated
    }
  }

  private readFallback(): Project[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw).map(ProjectSerializer.fromJSON);
    } catch {
      return [];
    }
  }

  private saveFallback(project: Project): void {
    const all = this.readFallback().filter((p) => p.id !== project.id);
    all.push(project);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
}
