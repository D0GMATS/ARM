import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { setupContainer } from '@/infrastructure/di/container';
import { App } from '@/app/App';
import '@/presentation/shared/styles/theme.css';

setupContainer();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
