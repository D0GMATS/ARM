import React from 'react';
import { Folder, Layers, FileText } from 'lucide-react';
import { Project } from '@/domain/entities/Project';
import styles from './ProjectTree.module.css';

interface ProjectTreeProps {
  project: Project | null;
  activeSchemeId: string | null;
  onSelectScheme: (schemeId: string) => void;
}

export const ProjectTree: React.FC<ProjectTreeProps> = ({
  project,
  activeSchemeId,
  onSelectScheme,
}) => {
  if (!project) {
    return (
      <div className={styles.tree}>
        <h3 className={styles.heading}>Дерево проекта</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>Проект не загружен</p>
      </div>
    );
  }

  return (
    <div className={styles.tree}>
      <h3 className={styles.heading}>Дерево проекта</h3>
      <div className={styles.projectName}>
        <Folder size={14} color="#1ABB9C" />
        <span>{project.name}</span>
      </div>
      {project.panels.map((panel) => (
        <div key={panel.id} className={styles.panelItem}>
          <div className={styles.panelTitle}>
            <Layers size={13} color="#34495E" />
            <span>{panel.name}</span>
          </div>
          {panel.schemes.map((scheme) => (
            <button
              key={scheme.id}
              className={`${styles.schemeBtn} ${
                scheme.id === activeSchemeId ? styles.schemeActive : ''
              }`}
              onClick={() => onSelectScheme(scheme.id)}
            >
              <FileText size={12} />
              <span>{scheme.name}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
