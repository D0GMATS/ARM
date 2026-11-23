import { Scheme } from '@/domain/entities/Scheme';

export class HistoryService {
  private past: Scheme[] = [];
  private future: Scheme[] = [];

  push(scheme: Scheme): void {
    this.past.push(scheme);
    this.future = [];
  }

  canUndo(): boolean {
    return this.past.length > 0;
  }

  canRedo(): boolean {
    return this.future.length > 0;
  }

  undo(current: Scheme): Scheme | null {
    const previous = this.past.pop();
    if (!previous) return null;
    this.future.push(current);
    return previous;
  }

  redo(current: Scheme): Scheme | null {
    const next = this.future.pop();
    if (!next) return null;
    this.past.push(current);
    return next;
  }

  clear(): void {
    this.past = [];
    this.future = [];
  }
}
