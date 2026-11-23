import { describe, it, expect } from 'vitest';
import { InMemoryProjectRepository } from '@/infrastructure/repositories/InMemoryProjectRepository';
import { Project } from '@/domain/entities/Project';

describe('InMemoryProjectRepository', () => {
  it('saves, finds, and deletes a project', async () => {
    const repo = new InMemoryProjectRepository();
    const project = new Project('p-1', 'Test Project');

    await repo.save(project);
    const found = await repo.findById('p-1');
    expect(found?.name).toBe('Test Project');

    const all = await repo.findAll();
    expect(all).toHaveLength(1);

    await repo.delete('p-1');
    expect(await repo.findById('p-1')).toBeNull();
  });
});
