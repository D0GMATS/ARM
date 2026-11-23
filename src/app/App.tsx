import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@/presentation/shared/ui/ErrorBoundary/ErrorBoundary';
import { ProjectsPage } from '@/presentation/pages/ProjectsPage/ProjectsPage';
import { EditorPage } from '@/presentation/pages/EditorPage/EditorPage';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProjectsPage />} />
          <Route path="/editor/:projectId" element={<EditorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
