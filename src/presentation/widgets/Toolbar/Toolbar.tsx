import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Save,
  Undo2,
  Redo2,
  MousePointer,
  GitBranch,
  CheckCircle,
  Download,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useEditorStore } from '@/presentation/shared/store/useEditorStore';
import styles from './Toolbar.module.css';

interface ToolbarProps {
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onValidate: () => void;
  onExportSVG: () => void;
  onExportJSON: () => void;
  onExportPNG: () => void;
  onExportPDF: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onSave,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onValidate,
  onExportSVG,
  onExportJSON,
  onExportPNG,
  onExportPDF,
}) => {
  const { activeTool, setActiveTool, zoom, setZoom, lastSavedAt } = useEditorStore();

  return (
    <header className={styles.toolbar}>
      <div className={styles.group}>
        <Link to="/" className={styles.brand}>
          <Zap size={18} className={styles.brandIcon} />
          <span>WebCAD 2.0</span>
        </Link>
        {lastSavedAt && <span className={styles.status}>Сохранено: {lastSavedAt}</span>}
      </div>

      <div className={styles.group}>
        <button className={styles.btn} onClick={onSave} title="Сохранить проект">
          <Save size={14} /> Сохранить
        </button>
        <button className={styles.btn} onClick={onUndo} disabled={!canUndo} title="Отменить">
          <Undo2 size={14} />
        </button>
        <button className={styles.btn} onClick={onRedo} disabled={!canRedo} title="Повторить">
          <Redo2 size={14} />
        </button>
      </div>

      <div className={styles.group}>
        <button
          className={`${styles.btn} ${activeTool === 'select' ? styles.btnActive : ''}`}
          onClick={() => setActiveTool('select')}
          title="Выделение и перемещение"
        >
          <MousePointer size={14} /> Выбор
        </button>
        <button
          className={`${styles.btn} ${activeTool === 'wire' ? styles.btnActive : ''}`}
          onClick={() => setActiveTool('wire')}
          title="Рисование провода"
        >
          <GitBranch size={14} /> Провод
        </button>
      </div>

      <div className={styles.group}>
        <button className={styles.btn} onClick={() => setZoom(zoom - 0.1)} title="Уменьшить">
          <ZoomOut size={14} />
        </button>
        <span style={{ fontSize: 12, minWidth: 42, textAlign: 'center' }}>
          {Math.round(zoom * 100)}%
        </span>
        <button className={styles.btn} onClick={() => setZoom(zoom + 0.1)} title="Увеличить">
          <ZoomIn size={14} />
        </button>
      </div>

      <div className={styles.group}>
        <button className={styles.btn} onClick={onValidate} title="Проверить схему">
          <CheckCircle size={14} /> Проверка
        </button>
        <button className={styles.btn} onClick={onExportSVG} title="Экспорт в SVG">
          <Download size={14} /> SVG
        </button>
        <button className={styles.btn} onClick={onExportPNG} title="Экспорт в PNG">
          <Download size={14} /> PNG
        </button>
        <button className={styles.btn} onClick={onExportPDF} title="Экспорт в PDF">
          <Download size={14} /> PDF
        </button>
        <button className={styles.btn} onClick={onExportJSON} title="Экспорт в JSON">
          <Download size={14} /> JSON
        </button>
      </div>
    </header>
  );
};
