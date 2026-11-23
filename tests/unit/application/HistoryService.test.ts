import { describe, it, expect } from 'vitest';
import { HistoryService } from '@/application/services/HistoryService';
import { Scheme } from '@/domain/entities/Scheme';

describe('HistoryService', () => {
  it('should support undo and redo', () => {
    const history = new HistoryService();
    const s1 = new Scheme('s1', 'p1', 'Rev 1');
    const s2 = s1.rename('Rev 2');

    history.push(s1);
    expect(history.canUndo()).toBe(true);
    expect(history.canRedo()).toBe(false);

    const undone = history.undo(s2);
    expect(undone?.name).toBe('Rev 1');
    expect(history.canRedo()).toBe(true);

    const redone = history.redo(undone!);
    expect(redone?.name).toBe('Rev 2');
  });
});
