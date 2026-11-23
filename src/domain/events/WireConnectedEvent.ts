import { DomainEvent } from './DomainEvent';
import { Wire } from '../entities/Wire';

export interface WireConnectedPayload {
  schemeId: string;
  wire: Wire;
}

export class WireConnectedEvent implements DomainEvent<WireConnectedPayload> {
  readonly type = 'wire:connected';
  readonly timestamp = Date.now();
  constructor(public readonly payload: WireConnectedPayload) {}
}
