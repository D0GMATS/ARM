import { describe, it, expect, vi } from 'vitest';
import { MoveObjectUseCase } from '@/application/use-cases/scheme/MoveObjectUseCase';
import { IEventBus } from '@/application/ports/IEventBus';
import { Scheme } from '@/domain/entities/Scheme';
import { GraphicObject } from '@/domain/entities/GraphicObject';
import { ObjectType } from '@/domain/types/ObjectType';
import { Point } from '@/domain/value-objects/Point';
import { Size } from '@/domain/value-objects/Size';
import { ObjectMovedEvent } from '@/domain/events/ObjectMovedEvent';

describe('MoveObjectUseCase', () => {
  it('should snap object position to grid and emit ObjectMovedEvent', () => {
    const mockEventBus: IEventBus = {
      on: vi.fn(),
      emit: vi.fn(),
    };
    const useCase = new MoveObjectUseCase(mockEventBus);
    const obj = new GraphicObject('obj-1', ObjectType.LAMP, 'HL1', new Point(0, 0), new Size(50, 50));
    const scheme = new Scheme('s1', 'p1', 'Test').addObject(obj);

    const updated = useCase.execute({
      scheme,
      objectId: 'obj-1',
      position: new Point(103, 198),
    });

    expect(updated.objects[0].position.x).toBe(100);
    expect(updated.objects[0].position.y).toBe(200);
    expect(mockEventBus.emit).toHaveBeenCalledWith(expect.any(ObjectMovedEvent));
  });
});
