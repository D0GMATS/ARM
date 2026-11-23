import { DomainEvent } from './DomainEvent';
import { Point } from '../value-objects/Point';

export interface ObjectMovedPayload {
  schemeId: string;
  objectId: string;
  newPosition: Point;
}

export class ObjectMovedEvent implements DomainEvent<ObjectMovedPayload> {
  readonly type = 'object:moved';
  readonly timestamp = Date.now();
  constructor(public readonly payload: ObjectMovedPayload) {}
}
