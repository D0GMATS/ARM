import { useEffect } from 'react';

interface KeyboardShortcutHandlers {
  onSave?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onDelete?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
}

export function useKeyboardShortcuts(handlers: KeyboardShortcutHandlers): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable;

      if (isInput) return;

      const isMod = e.ctrlKey || e.metaKey;

      if (isMod && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handlers.onSave?.();
      } else if (isMod && e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        handlers.onRedo?.();
      } else if (isMod && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        handlers.onUndo?.();
      } else if (isMod && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handlers.onRedo?.();
      } else if (isMod && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        handlers.onCopy?.();
      } else if (isMod && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        handlers.onPaste?.();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        handlers.onDelete?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
}
