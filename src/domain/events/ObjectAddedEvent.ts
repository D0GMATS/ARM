import { DomainEvent } from './DomainEvent';
import { GraphicObject } from '../entities/GraphicObject';

export interface ObjectAddedPayload {
  schemeId: string;
  object: GraphicObject;
}

export class ObjectAddedEvent implements DomainEvent<ObjectAddedPayload> {
  readonly type = 'object:added';
  readonly timestamp = Date.now();
  constructor(public readonly payload: ObjectAddedPayload) {}
}
