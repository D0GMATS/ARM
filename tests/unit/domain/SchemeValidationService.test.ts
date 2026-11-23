import { describe, it, expect } from 'vitest';
import { SchemeValidationService } from '@/domain/services/SchemeValidationService';
import { Scheme } from '@/domain/entities/Scheme';
import { GraphicObject } from '@/domain/entities/GraphicObject';
import { Terminal } from '@/domain/entities/Terminal';
import { Wire } from '@/domain/entities/Wire';
import { ObjectType } from '@/domain/types/ObjectType';
import { Point } from '@/domain/value-objects/Point';
import { Size } from '@/domain/value-objects/Size';

describe('SchemeValidationService', () => {
  const service = new SchemeValidationService();

  it('should detect duplicate designations', () => {
    const obj1 = new GraphicObject('1', ObjectType.CIRCUIT_BREAKER, 'QF1', new Point(0, 0), new Size(60, 80));
    const obj2 = new GraphicObject('2', ObjectType.CIRCUIT_BREAKER, 'QF1', new Point(100, 0), new Size(60, 80));
    const scheme = new Scheme('s1', 'p1', 'Test').addObject(obj1).addObject(obj2);

    const result = service.validate(scheme);

    expect(result.isValid).toBe(false);
    expect(result.issues.some((i) => i.type === 'DUPLICATE_DESIGNATION')).toBe(true);
  });

  it('should detect short circuit when wire connects same object', () => {
    const t1 = new Terminal('t1', '1', new Point(0, 0));
    const t2 = new Terminal('t2', '2', new Point(0, 80));
    const obj1 = new GraphicObject('1', ObjectType.CIRCUIT_BREAKER, 'QF1', new Point(0, 0), new Size(60, 80), undefined, [t1, t2]);
    const wire = new Wire('w1', '1', 't1', '1', 't2');
    const scheme = new Scheme('s1', 'p1', 'Test').addObject(obj1).addWire(wire);

    const result = service.validate(scheme);

    expect(result.isValid).toBe(false);
    expect(result.issues.some((i) => i.type === 'SHORT_CIRCUIT')).toBe(true);
  });

  it('should pass validation for valid connected scheme', () => {
    const t1 = new Terminal('t1', '1', new Point(0, 0), 'ANY');
    const t2 = new Terminal('t2', '2', new Point(0, 0), 'ANY');
    const obj1 = new GraphicObject('1', ObjectType.CIRCUIT_BREAKER, 'QF1', new Point(0, 0), new Size(60, 80), undefined, [t1]);
    const obj2 = new GraphicObject('2', ObjectType.LAMP, 'HL1', new Point(100, 0), new Size(50, 50), undefined, [t2]);
    const wire = new Wire('w1', '1', 't1', '2', 't2');
    const scheme = new Scheme('s1', 'p1', 'Test').addObject(obj1).addObject(obj2).addWire(wire);

    const result = service.validate(scheme);

    expect(result.isValid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });
});
