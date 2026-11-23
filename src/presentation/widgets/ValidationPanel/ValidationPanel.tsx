import React from 'react';
import { ValidationIssue } from '@/domain/events/SchemeValidatedEvent';
import styles from './ValidationPanel.module.css';

interface ValidationPanelProps {
  issues: ValidationIssue[];
}

export const ValidationPanel: React.FC<ValidationPanelProps> = ({ issues }) => {
  return (
    <div className={styles.panel}>
      <h3 className={styles.heading}>Валидация ({issues.length})</h3>
      {issues.length === 0 ? (
        <p className={styles.ok}>Ошибок не обнаружено</p>
      ) : (
        issues.map((issue) => (
          <div
            key={issue.id}
            className={`${styles.issue} ${
              issue.severity === 'error' ? styles.error : styles.warning
            }`}
          >
            {issue.message}
          </div>
        ))
      )}
    </div>
  );
};
