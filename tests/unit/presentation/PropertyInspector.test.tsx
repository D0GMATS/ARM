import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyInspector } from '@/presentation/widgets/PropertyInspector/PropertyInspector';
import { GraphicObject } from '@/domain/entities/GraphicObject';
import { ObjectType } from '@/domain/types/ObjectType';
import { Point } from '@/domain/value-objects/Point';
import { Size } from '@/domain/value-objects/Size';

describe('PropertyInspector', () => {
  it('shows empty state when no object is selected', () => {
    render(
      <PropertyInspector
        selectedObject={null}
        onUpdateObject={vi.fn()}
        onDeleteObject={vi.fn()}
      />
    );
    expect(
      screen.getByText('Выберите объект на схеме для редактирования свойств.')
    ).toBeInTheDocument();
  });

  it('calls onDeleteObject when delete button is clicked', () => {
    const onDelete = vi.fn();
    const obj = new GraphicObject(
      'obj-1',
      ObjectType.CIRCUIT_BREAKER,
      'QF1',
      new Point(20, 40),
      new Size(60, 80)
    );

    render(
      <PropertyInspector
        selectedObject={obj}
        onUpdateObject={vi.fn()}
        onDeleteObject={onDelete}
      />
    );

    fireEvent.click(screen.getByText('Удалить'));
    expect(onDelete).toHaveBeenCalledWith('obj-1');
  });
});
