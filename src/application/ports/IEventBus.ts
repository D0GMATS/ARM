import { DomainEvent } from '@/domain/events/DomainEvent';

export const IEventBusToken = Symbol('IEventBus');

export type EventHandler<T = unknown> = (event: DomainEvent<T>) => void;

export interface IEventBus {
  on<T = unknown>(eventType: string, handler: EventHandler<T>): () => void;
  emit<T = unknown>(event: DomainEvent<T>): void;
}
