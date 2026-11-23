import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Plus, Trash2, FolderOpen } from 'lucide-react';
import { Project } from '@/domain/entities/Project';
import { useContainer } from '@/infrastructure/di/container';
import { CreateProjectUseCase } from '@/application/use-cases/project/CreateProjectUseCase';
import { LoadProjectUseCase } from '@/application/use-cases/project/LoadProjectUseCase';
import { DeleteProjectUseCase } from '@/application/use-cases/project/DeleteProjectUseCase';
import styles from './ProjectsPage.module.css';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const createUseCase = useContainer(CreateProjectUseCase);
  const loadUseCase = useContainer(LoadProjectUseCase);
  const deleteUseCase = useContainer(DeleteProjectUseCase);

  const [projects, setProjects] = useState<Project[]>([]);
  const [newName, setNewName] = useState('');

  const refresh = async () => {
    const list = await loadUseCase.loadAll();
    setProjects(list);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const project = await createUseCase.execute({ name: newName });
    setNewName('');
    navigate(`/editor/${project.id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteUseCase.execute(id);
    await refresh();
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <Zap size={24} color="#1ABB9C" />
          WebCAD 2.0 — Проекты
        </h1>
      </div>

      <form className={styles.createForm} onSubmit={handleCreate}>
        <input
          className={styles.input}
          placeholder="Название нового проекта (например: Щит управления ЩО-1)"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button type="submit" className={styles.btnPrimary}>
          <Plus size={16} /> Создать проект
        </button>
      </form>

      <div className={styles.grid}>
        {projects.map((p) => (
          <div key={p.id} className={styles.card}>
            <div>
              <h3 className={styles.cardTitle}>{p.name}</h3>
              <div className={styles.cardMeta}>
                Щитов: {p.panels.length} · Обновлен:{' '}
                {new Date(p.updatedAt).toLocaleDateString('ru-RU')}
              </div>
            </div>
            <div className={styles.cardActions}>
              <button
                className={styles.btnPrimary}
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => navigate(`/editor/${p.id}`)}
              >
                <FolderOpen size={14} /> Открыть
              </button>
              <button
                className={styles.btnDanger}
                onClick={() => handleDelete(p.id)}
                title="Удалить проект"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
