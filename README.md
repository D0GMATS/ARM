# WebCAD 2.0

Веб-редактор электрических схем щитов управления и систем автоматизации, построенный на принципах **Clean Architecture + Feature-Sliced Design**.

## Архитектура

- `src/domain/` — бизнес-логика (Entities, Value Objects, Domain Services, Domain Events, Repository Interfaces). Не зависит ни от каких других слоёв.
- `src/application/` — Use Cases, Ports (`IEventBus`), `HistoryService` (Undo/Redo), `ExportService` (SVG, PNG, PDF, JSON).
- `src/infrastructure/` — реализации репозиториев (`HttpProjectRepository`, `InMemoryProjectRepository`), `EventBus`, DI-контейнер (`tsyringe`).
- `src/presentation/` — React 18 UI (Pages, Widgets, Hooks, Zustand store, CSS Modules в стиле Gentelella).
- `server/` — Express + SQLite (`node:sqlite`) API-сервер.

## Скрипты

- `npm run dev` — запуск Vite dev-сервера (`http://localhost:5173`)
- `npm run server` — запуск Express API-сервера (`http://localhost:3001`)
- `npm run typecheck` — проверка типов TypeScript (strict mode)
- `npm test` — запуск unit и integration тестов (Vitest + React Testing Library)
- `npm run build` — сборка production-бандла
