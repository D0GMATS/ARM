import { create } from 'zustand';
import { Project } from '@/domain/entities/Project';
import { Scheme } from '@/domain/entities/Scheme';
import { ValidationIssue } from '@/domain/events/SchemeValidatedEvent';

export type EditorTool = 'select' | 'wire';

interface EditorState {
  project: Project | null;
  openSchemeIds: string[];
  activeSchemeId: string | null;
  selectedObjectId: string | null;
  activeTool: EditorTool;
  zoom: number;
  validationIssues: ValidationIssue[];
  lastSavedAt: string | null;

  setProject: (project: Project | null) => void;
  openScheme: (schemeId: string) => void;
  closeSchemeTab: (schemeId: string) => void;
  setActiveSchemeId: (schemeId: string | null) => void;
  updateActiveScheme: (scheme: Scheme) => void;
  setSelectedObjectId: (objectId: string | null) => void;
  setActiveTool: (tool: EditorTool) => void;
  setZoom: (zoom: number) => void;
  setValidationIssues: (issues: ValidationIssue[]) => void;
  setLastSavedAt: (timestamp: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  project: null,
  openSchemeIds: [],
  activeSchemeId: null,
  selectedObjectId: null,
  activeTool: 'select',
  zoom: 1,
  validationIssues: [],
  lastSavedAt: null,

  setProject: (project) => {
    const firstSchemeId = project?.panels[0]?.schemes[0]?.id ?? null;
    set({
      project,
      openSchemeIds: firstSchemeId ? [firstSchemeId] : [],
      activeSchemeId: firstSchemeId,
      selectedObjectId: null,
      validationIssues: [],
    });
  },

  openScheme: (schemeId) =>
    set((state) => ({
      openSchemeIds: state.openSchemeIds.includes(schemeId)
        ? state.openSchemeIds
        : [...state.openSchemeIds, schemeId],
      activeSchemeId: schemeId,
      selectedObjectId: null,
    })),

  closeSchemeTab: (schemeId) =>
    set((state) => {
      const nextTabs = state.openSchemeIds.filter((id) => id !== schemeId);
      const nextActive =
        state.activeSchemeId === schemeId ? (nextTabs[nextTabs.length - 1] ?? null) : state.activeSchemeId;
      return { openSchemeIds: nextTabs, activeSchemeId: nextActive };
    }),

  setActiveSchemeId: (activeSchemeId) => set({ activeSchemeId, selectedObjectId: null }),

  updateActiveScheme: (scheme) =>
    set((state) => {
      if (!state.project) return state;
      return { project: state.project.updateScheme(scheme) };
    }),

  setSelectedObjectId: (selectedObjectId) => set({ selectedObjectId }),
  setActiveTool: (activeTool) => set({ activeTool }),
  setZoom: (zoom) => set({ zoom: Math.max(0.25, Math.min(3, zoom)) }),
  setValidationIssues: (validationIssues) => set({ validationIssues }),
  setLastSavedAt: (lastSavedAt) => set({ lastSavedAt }),
}));
