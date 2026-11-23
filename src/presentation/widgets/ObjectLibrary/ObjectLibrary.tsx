import React from 'react';
import { ObjectType } from '@/domain/types/ObjectType';
import { UGO_CATALOG } from '@/domain/services/ObjectCatalogService';
import styles from './ObjectLibrary.module.css';

interface ObjectLibraryProps {
  onAddObject: (type: ObjectType) => void;
}

export const ObjectLibrary: React.FC<ObjectLibraryProps> = ({ onAddObject }) => {
  return (
    <div className={styles.library}>
      <h3 className={styles.heading}>Библиотека УГО</h3>
      <div className={styles.grid}>
        {UGO_CATALOG.map((item) => (
          <button
            key={item.type}
            className={styles.card}
            onClick={() => onAddObject(item.type)}
            title={`Добавить ${item.label}`}
          >
            <span>{item.label}</span>
            <span className={styles.prefix}>{item.defaultPrefix}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
