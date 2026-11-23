import React from 'react';
import { GraphicObject } from '@/domain/entities/GraphicObject';
import styles from './PropertyInspector.module.css';

interface PropertyInspectorProps {
  selectedObject: GraphicObject | null;
  onUpdateObject: (updated: GraphicObject) => void;
  onDeleteObject: (objectId: string) => void;
}

export const PropertyInspector: React.FC<PropertyInspectorProps> = ({
  selectedObject,
  onUpdateObject,
  onDeleteObject,
}) => {
  if (!selectedObject) {
    return (
      <div className={styles.inspector}>
        <h3 className={styles.heading}>Свойства</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>
          Выберите объект на схеме для редактирования свойств.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.inspector}>
      <h3 className={styles.heading}>Свойства: {selectedObject.designation}</h3>

      <div className={styles.field}>
        <label className={styles.label}>Обозначение</label>
        <input
          className={styles.input}
          value={selectedObject.designation}
          onChange={(e) => onUpdateObject(selectedObject.updateDesignation(e.target.value))}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Номинальный ток</label>
        <input
          className={styles.input}
          value={selectedObject.properties.ratedCurrent ?? ''}
          onChange={(e) =>
            onUpdateObject(selectedObject.updateProperties({ ratedCurrent: e.target.value }))
          }
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Напряжение</label>
        <input
          className={styles.input}
          value={selectedObject.properties.voltage ?? ''}
          onChange={(e) =>
            onUpdateObject(selectedObject.updateProperties({ voltage: e.target.value }))
          }
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Позиция: X={selectedObject.position.x}, Y={selectedObject.position.y}
        </label>
      </div>

      <div className={styles.actions}>
        <button className={styles.btn} onClick={() => onUpdateObject(selectedObject.rotate())}>
          Повернуть 90°
        </button>
        <button
          className={`${styles.btn} ${styles.btnDanger}`}
          onClick={() => onDeleteObject(selectedObject.id)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};
