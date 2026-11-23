import { Scheme } from '@/domain/entities/Scheme';
import { ObjectMovedEvent } from '@/domain/events/ObjectMovedEvent';
import { Point } from '@/domain/value-objects/Point';
import { IEventBus } from '@/application/ports/IEventBus';

export interface MoveObjectCommand {
  scheme: Scheme;
  objectId: string;
  position: Point;
}

export class MoveObjectUseCase {
  constructor(private readonly eventBus: IEventBus) {}

  execute(command: MoveObjectCommand): Scheme {
    const snapped = command.position.snapToGrid(20);
    const updatedScheme = command.scheme.moveObject(command.objectId, snapped);
    this.eventBus.emit(
      new ObjectMovedEvent({
        schemeId: command.scheme.id,
        objectId: command.objectId,
        newPosition: snapped,
      })
    );
    return updatedScheme;
  }
}
