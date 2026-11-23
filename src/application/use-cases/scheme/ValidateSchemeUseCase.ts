import { Scheme } from '@/domain/entities/Scheme';
import { SchemeValidatedEvent, ValidationResult } from '@/domain/events/SchemeValidatedEvent';
import { SchemeValidationService } from '@/domain/services/SchemeValidationService';
import { IEventBus } from '@/application/ports/IEventBus';

export class ValidateSchemeUseCase {
  constructor(
    private readonly validationService: SchemeValidationService,
    private readonly eventBus: IEventBus
  ) {}

  execute(scheme: Scheme): ValidationResult {
    const result = this.validationService.validate(scheme);
    this.eventBus.emit(new SchemeValidatedEvent({ schemeId: scheme.id, result }));
    return result;
  }
}
