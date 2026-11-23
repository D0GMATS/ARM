import { DomainEvent } from './DomainEvent';

export type ValidationErrorType =
  | 'SHORT_CIRCUIT'
  | 'OPEN_CIRCUIT'
  | 'DUPLICATE_DESIGNATION'
  | 'UNCONNECTED_OBJECT';

export interface ValidationIssue {
  id: string;
  type: ValidationErrorType;
  severity: 'error' | 'warning';
  message: string;
  objectId?: string;
  wireId?: string;
}

export interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
}

export class SchemeValidatedEvent implements DomainEvent<{ schemeId: string; result: ValidationResult }> {
  readonly type = 'scheme:validated';
  readonly timestamp = Date.now();
  constructor(public readonly payload: { schemeId: string; result: ValidationResult }) {}
}
