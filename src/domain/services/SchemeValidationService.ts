import { Scheme } from '../entities/Scheme';
import { ValidationIssue, ValidationResult } from '../events/SchemeValidatedEvent';

export class SchemeValidationService {
  validate(scheme: Scheme): ValidationResult {
    const issues: ValidationIssue[] = [];

    this.checkDuplicateDesignations(scheme, issues);
    this.checkShortCircuits(scheme, issues);
    this.checkUnconnectedObjects(scheme, issues);

    const hasErrors = issues.some((i) => i.severity === 'error');
    return {
      isValid: !hasErrors,
      issues,
    };
  }

  private checkDuplicateDesignations(scheme: Scheme, issues: ValidationIssue[]): void {
    const seen = new Map<string, string>();
    for (const obj of scheme.objects) {
      const key = obj.designation.trim().toUpperCase();
      if (!key) continue;
      const existingId = seen.get(key);
      if (existingId) {
        issues.push({
          id: `dup-${obj.id}`,
          type: 'DUPLICATE_DESIGNATION',
          severity: 'error',
          message: `Дублирующееся обозначение "${obj.designation}"`,
          objectId: obj.id,
        });
      } else {
        seen.set(key, obj.id);
      }
    }
  }

  private checkShortCircuits(scheme: Scheme, issues: ValidationIssue[]): void {
    for (const wire of scheme.electricalGraph.wires) {
      if (wire.fromObjectId === wire.toObjectId) {
        issues.push({
          id: `sc-self-${wire.id}`,
          type: 'SHORT_CIRCUIT',
          severity: 'error',
          message: 'Короткое замыкание: провод соединяет клеммы одного и того же объекта',
          wireId: wire.id,
        });
        continue;
      }

      const fromObj = scheme.objects.find((o) => o.id === wire.fromObjectId);
      const toObj = scheme.objects.find((o) => o.id === wire.toObjectId);
      const fromTerm = fromObj?.terminals.find((t) => t.id === wire.fromTerminalId);
      const toTerm = toObj?.terminals.find((t) => t.id === wire.toTerminalId);

      if (fromTerm && toTerm) {
        const polarities = new Set([fromTerm.polarity, toTerm.polarity]);
        if (polarities.has('LINE') && (polarities.has('NEUTRAL') || polarities.has('GROUND'))) {
          issues.push({
            id: `sc-pol-${wire.id}`,
            type: 'SHORT_CIRCUIT',
            severity: 'error',
            message: 'Короткое замыкание: прямое соединение фазы (L) с нейтралью (N) или землей (PE)',
            wireId: wire.id,
          });
        }
      }
    }
  }

  private checkUnconnectedObjects(scheme: Scheme, issues: ValidationIssue[]): void {
    if (scheme.objects.length <= 1) return;
    for (const obj of scheme.objects) {
      const wires = scheme.electricalGraph.getWiresForObject(obj.id);
      if (wires.length === 0) {
        issues.push({
          id: `unconn-${obj.id}`,
          type: 'UNCONNECTED_OBJECT',
          severity: 'warning',
          message: `Объект "${obj.designation}" не подключен ни к одной цепи`,
          objectId: obj.id,
        });
      }
    }
  }
}
