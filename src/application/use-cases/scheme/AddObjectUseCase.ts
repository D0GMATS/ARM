import { Scheme } from '@/domain/entities/Scheme';
import { ObjectAddedEvent } from '@/domain/events/ObjectAddedEvent';
import { ObjectCatalogService } from '@/domain/services/ObjectCatalogService';
import { ObjectType } from '@/domain/types/ObjectType';
import { Point } from '@/domain/value-objects/Point';
import { IEventBus } from '@/application/ports/IEventBus';

export interface AddObjectCommand {
  scheme: Scheme;
  type: ObjectType;
  position: Point;
}

export class AddObjectUseCase {
  constructor(
    private readonly catalogService: ObjectCatalogService,
    private readonly eventBus: IEventBus
  ) {}

  execute(command: AddObjectCommand): Scheme {
    const id = `obj-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const indexNumber = command.scheme.objects.length + 1;
    const object = this.catalogService.createDefaultObject(
      id,
      command.type,
      command.position.snapToGrid(20),
      indexNumber
    );

    const updatedScheme = command.scheme.addObject(object);
    this.eventBus.emit(new ObjectAddedEvent({ schemeId: command.scheme.id, object }));
    return updatedScheme;
  }
}
