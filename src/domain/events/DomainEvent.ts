export interface DomainEvent<T = unknown> {
  readonly type: string;
  readonly timestamp: number;
  readonly payload: T;
}
