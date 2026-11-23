import 'reflect-metadata';
import { container, InjectionToken } from 'tsyringe';

import { IProjectRepositoryToken } from '@/domain/repositories/IProjectRepository';
import { SchemeValidationService } from '@/domain/services/SchemeValidationService';
import { WireRoutingService } from '@/domain/services/WireRoutingService';
import { ObjectCatalogService } from '@/domain/services/ObjectCatalogService';

import { IEventBusToken } from '@/application/ports/IEventBus';
import { HistoryService } from '@/application/services/HistoryService';
import { ExportService } from '@/application/services/ExportService';

import { CreateProjectUseCase } from '@/application/use-cases/project/CreateProjectUseCase';
import { LoadProjectUseCase } from '@/application/use-cases/project/LoadProjectUseCase';
import { SaveProjectUseCase } from '@/application/use-cases/project/SaveProjectUseCase';
import { DeleteProjectUseCase } from '@/application/use-cases/project/DeleteProjectUseCase';

import { AddObjectUseCase } from '@/application/use-cases/scheme/AddObjectUseCase';
import { MoveObjectUseCase } from '@/application/use-cases/scheme/MoveObjectUseCase';
import { DeleteObjectUseCase } from '@/application/use-cases/scheme/DeleteObjectUseCase';
import { DrawWireUseCase } from '@/application/use-cases/scheme/DrawWireUseCase';
import { ValidateSchemeUseCase } from '@/application/use-cases/scheme/ValidateSchemeUseCase';

import { EventBus } from '@/infrastructure/events/EventBus';
import { HttpProjectRepository } from '@/infrastructure/repositories/HttpProjectRepository';

export function setupContainer(): void {
  container.registerSingleton(IEventBusToken, EventBus);
  container.registerSingleton(IProjectRepositoryToken, HttpProjectRepository);

  container.registerSingleton(SchemeValidationService);
  container.registerSingleton(WireRoutingService);
  container.registerSingleton(ObjectCatalogService);
  container.registerSingleton(HistoryService);
  container.registerSingleton(ExportService);

  container.register(CreateProjectUseCase, {
    useFactory: (c) => new CreateProjectUseCase(c.resolve(IProjectRepositoryToken)),
  });
  container.register(LoadProjectUseCase, {
    useFactory: (c) => new LoadProjectUseCase(c.resolve(IProjectRepositoryToken)),
  });
  container.register(SaveProjectUseCase, {
    useFactory: (c) => new SaveProjectUseCase(c.resolve(IProjectRepositoryToken)),
  });
  container.register(DeleteProjectUseCase, {
    useFactory: (c) => new DeleteProjectUseCase(c.resolve(IProjectRepositoryToken)),
  });

  container.register(AddObjectUseCase, {
    useFactory: (c) =>
      new AddObjectUseCase(c.resolve(ObjectCatalogService), c.resolve(IEventBusToken)),
  });
  container.register(MoveObjectUseCase, {
    useFactory: (c) => new MoveObjectUseCase(c.resolve(IEventBusToken)),
  });
  container.register(DeleteObjectUseCase, {
    useClass: DeleteObjectUseCase,
  });
  container.register(DrawWireUseCase, {
    useFactory: (c) =>
      new DrawWireUseCase(c.resolve(WireRoutingService), c.resolve(IEventBusToken)),
  });
  container.register(ValidateSchemeUseCase, {
    useFactory: (c) =>
      new ValidateSchemeUseCase(c.resolve(SchemeValidationService), c.resolve(IEventBusToken)),
  });
}

export function useContainer<T>(token: InjectionToken<T>): T {
  return container.resolve<T>(token);
}

export { container };
