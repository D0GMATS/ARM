import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Point } from '@/domain/value-objects/Point';
import { ObjectType } from '@/domain/types/ObjectType';
import { GraphicObject } from '@/domain/entities/GraphicObject';
import { Panel } from '@/domain/entities/Panel';
import { Scheme } from '@/domain/entities/Scheme';
import { Project } from '@/domain/entities/Project';
import { useContainer } from '@/infrastructure/di/container';
import { LoadProjectUseCase } from '@/application/use-cases/project/LoadProjectUseCase';
import { SaveProjectUseCase } from '@/application/use-cases/project/SaveProjectUseCase';
import { AddObjectUseCase } from '@/application/use-cases/scheme/AddObjectUseCase';
import { MoveObjectUseCase } from '@/application/use-cases/scheme/MoveObjectUseCase';
import { DeleteObjectUseCase } from '@/application/use-cases/scheme/DeleteObjectUseCase';
import { DrawWireUseCase } from '@/application/use-cases/scheme/DrawWireUseCase';
import { ValidateSchemeUseCase } from '@/application/use-cases/scheme/ValidateSchemeUseCase';
import { HistoryService } from '@/application/services/HistoryService';
import { ExportService } from '@/application/services/ExportService';
import { useEditorStore } from '@/presentation/shared/store/useEditorStore';
import { Toolbar } from '@/presentation/widgets/Toolbar/Toolbar';
import { ProjectTree } from '@/presentation/widgets/ProjectTree/ProjectTree';
import { ObjectLibrary } from '@/presentation/widgets/ObjectLibrary/ObjectLibrary';
import { TabsBar } from '@/presentation/widgets/TabsBar/TabsBar';
import { SchemeCanvas } from '@/presentation/widgets/SchemeCanvas/SchemeCanvas';
import { PropertyInspector } from '@/presentation/widgets/PropertyInspector/PropertyInspector';
import { ValidationPanel } from '@/presentation/widgets/ValidationPanel/ValidationPanel';
import styles from './EditorPage.module.css';

export const EditorPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const loadProject = useContainer(LoadProjectUseCase);
  const saveProject = useContainer(SaveProjectUseCase);
  const addObjectUseCase = useContainer(AddObjectUseCase);
  const moveObjectUseCase = useContainer(MoveObjectUseCase);
  const deleteObjectUseCase = useContainer(DeleteObjectUseCase);
  const drawWireUseCase = useContainer(DrawWireUseCase);
  const validateSchemeUseCase = useContainer(ValidateSchemeUseCase);
  const history = useContainer(HistoryService);
  const exportService = useContainer(ExportService);

  const {
    project,
    openSchemeIds,
    activeSchemeId,
    selectedObjectId,
    validationIssues,
    setProject,
    openScheme,
    closeSchemeTab,
    setActiveSchemeId,
    updateActiveScheme,
    setSelectedObjectId,
    setValidationIssues,
    setLastSavedAt,
  } = useEditorStore();

  useEffect(() => {
    if (!projectId) return;
    loadProject.execute(projectId).then(setProject).catch(console.error);
    history.clear();
  }, [projectId]);

  const activeScheme =
    project && activeSchemeId ? project.findSchemeById(activeSchemeId) : null;

  const selectedObject =
    activeScheme?.objects.find((o) => o.id === selectedObjectId) ?? null;

  const handleSave = useCallback(async () => {
    if (!project) return;
    await saveProject.execute(project);
    setLastSavedAt(new Date().toLocaleTimeString('ru-RU'));
  }, [project, saveProject, setLastSavedAt]);

  // Autosave every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      void handleSave();
    }, 30000);
    return () => clearInterval(timer);
  }, [handleSave]);

  const commitScheme = (nextScheme: NonNullable<typeof activeScheme>) => {
    if (activeScheme) history.push(activeScheme);
    updateActiveScheme(nextScheme);
  };

  const handleAddObject = (type: ObjectType) => {
    if (!activeScheme) return;
    const next = addObjectUseCase.execute({
      scheme: activeScheme,
      type,
      position: new Point(120 + activeScheme.objects.length * 30, 120),
    });
    commitScheme(next);
  };

  const handleMoveObject = (objectId: string, position: Point) => {
    if (!activeScheme) return;
    const next = moveObjectUseCase.execute({ scheme: activeScheme, objectId, position });
    commitScheme(next);
  };

  const handleUpdateObject = (updated: GraphicObject) => {
    if (!activeScheme) return;
    commitScheme(activeScheme.updateObject(updated));
  };

  const handleDeleteObject = (objectId: string) => {
    if (!activeScheme) return;
    commitScheme(deleteObjectUseCase.execute(activeScheme, objectId));
    setSelectedObjectId(null);
  };

  const handleConnectWire = (
    fromObjectId: string,
    fromTerminalId: string,
    toObjectId: string,
    toTerminalId: string
  ) => {
    if (!activeScheme) return;
    const next = drawWireUseCase.execute({
      scheme: activeScheme,
      fromObjectId,
      fromTerminalId,
      toObjectId,
      toTerminalId,
    });
    commitScheme(next);
  };

  const handleValidate = () => {
    if (!activeScheme) return;
    const result = validateSchemeUseCase.execute(activeScheme);
    setValidationIssues(result.issues);
  };

  return (
    <div className={styles.layout}>
      <Toolbar
        onSave={() => void handleSave()}
        onUndo={() => {
          if (!activeScheme) return;
          const prev = history.undo(activeScheme);
          if (prev) updateActiveScheme(prev);
        }}
        onRedo={() => {
          if (!activeScheme) return;
          const next = history.redo(activeScheme);
          if (next) updateActiveScheme(next);
        }}
        canUndo={history.canUndo()}
        canRedo={history.canRedo()}
        onValidate={handleValidate}
        onExportSVG={() => {
          if (!activeScheme) return;
          exportService.downloadFile(
            exportService.exportToSVG(activeScheme),
            `${activeScheme.name}.svg`,
            'image/svg+xml'
          );
        }}
        onExportPNG={() => {
          if (!activeScheme) return;
          exportService.exportToPNG(activeScheme);
        }}
        onExportPDF={() => {
          exportService.exportToPDF();
        }}
        onExportJSON={() => {
          if (!activeScheme) return;
          exportService.downloadFile(
            exportService.exportToJSON(activeScheme),
            `${activeScheme.name}.json`,
            'application/json'
          );
        }}
      />

      <div className={styles.workspace}>
        <aside className={styles.leftSidebar}>
          <ProjectTree
            project={project}
            activeSchemeId={activeSchemeId}
            onSelectScheme={openScheme}
            onAddPanel={() => {
              if (!project) return;
              const panelId = `panel-${Date.now()}`;
              const schemeId = `scheme-${Date.now()}`;
              const newScheme = new Scheme(schemeId, panelId, 'Схема 1');
              const newPanel = new Panel(
                panelId,
                project.id,
                `ЩО-${project.panels.length + 1}`,
                [newScheme]
              );
              setProject(project.addPanel(newPanel));
              openScheme(schemeId);
            }}
            onAddScheme={(panelId) => {
              if (!project) return;
              const schemeId = `scheme-${Date.now()}`;
              const nextPanels = project.panels.map((p) => {
                if (p.id !== panelId) return p;
                const newScheme = new Scheme(schemeId, panelId, `Схема ${p.schemes.length + 1}`);
                return p.addScheme(newScheme);
              });
              setProject(
                new Project(project.id, project.name, project.description, nextPanels)
              );
              openScheme(schemeId);
            }}
          />
          <ObjectLibrary onAddObject={handleAddObject} />
        </aside>

        <main className={styles.centerArea}>
          <TabsBar
            project={project}
            openSchemeIds={openSchemeIds}
            activeSchemeId={activeSchemeId}
            onSelectTab={setActiveSchemeId}
            onCloseTab={closeSchemeTab}
          />
          <div className={styles.canvasWrapper}>
            {activeScheme ? (
              <SchemeCanvas
                scheme={activeScheme}
                onMoveObject={handleMoveObject}
                onConnectWire={handleConnectWire}
              />
            ) : (
              <div className={styles.emptyCanvas}>Выберите схему в дереве проекта</div>
            )}
          </div>
        </main>

        <aside className={styles.rightSidebar}>
          <PropertyInspector
            selectedObject={selectedObject}
            onUpdateObject={handleUpdateObject}
            onDeleteObject={handleDeleteObject}
          />
          <ValidationPanel issues={validationIssues} />
        </aside>
      </div>
    </div>
  );
};
