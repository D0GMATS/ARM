import React from 'react';
import { X } from 'lucide-react';
import { Project } from '@/domain/entities/Project';
import styles from './TabsBar.module.css';

interface TabsBarProps {
  project: Project | null;
  openSchemeIds: string[];
  activeSchemeId: string | null;
  onSelectTab: (schemeId: string) => void;
  onCloseTab: (schemeId: string) => void;
}

export const TabsBar: React.FC<TabsBarProps> = ({
  project,
  openSchemeIds,
  activeSchemeId,
  onSelectTab,
  onCloseTab,
}) => {
  if (!project || openSchemeIds.length === 0) return null;

  return (
    <div className={styles.tabsBar}>
      {openSchemeIds.map((id) => {
        const scheme = project.findSchemeById(id);
        if (!scheme) return null;
        return (
          <div
            key={id}
            className={`${styles.tab} ${id === activeSchemeId ? styles.tabActive : ''}`}
            onClick={() => onSelectTab(id)}
          >
            <span>{scheme.name}</span>
            <button
              className={styles.closeBtn}
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(id);
              }}
              title="Закрыть вкладку"
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
