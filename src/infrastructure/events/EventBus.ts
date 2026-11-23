import { DomainEvent } from '@/domain/events/DomainEvent';
import { EventHandler, IEventBus } from '@/application/ports/IEventBus';

export class EventBus implements IEventBus {
  private listeners = new Map<string, Set<EventHandler<unknown>>>();

  on<T = unknown>(eventType: string, handler: EventHandler<T>): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    const set = this.listeners.get(eventType)!;
    const wrapped = handler as EventHandler<unknown>;
    set.add(wrapped);

    return () => {
      set.delete(wrapped);
    };
  }

  emit<T = unknown>(event: DomainEvent<T>): void {
    const set = this.listeners.get(event.type);
    if (!set) return;
    for (const handler of set) {
      handler(event as DomainEvent<unknown>);
    }
  }
}
