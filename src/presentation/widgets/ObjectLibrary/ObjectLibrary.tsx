import React, { useState, useMemo } from 'react';
import { ObjectType } from '@/domain/types/ObjectType';
import { UGO_CATALOG } from '@/domain/services/ObjectCatalogService';
import { UgoPreview } from './UgoPreview';
import styles from './ObjectLibrary.module.css';

interface ObjectLibraryProps {
  onAddObject: (type: ObjectType) => void;
}

export const ObjectLibrary: React.FC<ObjectLibraryProps> = ({ onAddObject }) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return UGO_CATALOG;
    return UGO_CATALOG.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.defaultPrefix.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className={styles.library}>
      <h3 className={styles.heading}>Библиотека УГО</h3>
      <input
        className={styles.search}
        placeholder="Поиск УГО..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className={styles.grid}>
        {filtered.map((item) => (
          <button
            key={item.type}
            className={styles.card}
            onClick={() => onAddObject(item.type)}
            title={`Добавить ${item.label}`}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <UgoPreview type={item.type} />
              <span>{item.label}</span>
            </span>
            <span className={styles.prefix}>{item.defaultPrefix}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
