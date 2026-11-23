import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ValidationPanel } from '@/presentation/widgets/ValidationPanel/ValidationPanel';

describe('ValidationPanel', () => {
  it('shows success message when there are no issues', () => {
    render(<ValidationPanel issues={[]} />);
    expect(screen.getByText('Ошибок не обнаружено')).toBeInTheDocument();
  });

  it('renders validation issues', () => {
    render(
      <ValidationPanel
        issues={[
          {
            id: '1',
            type: 'SHORT_CIRCUIT',
            severity: 'error',
            message: 'Короткое замыкание',
          },
        ]}
      />
    );
    expect(screen.getByText('Короткое замыкание')).toBeInTheDocument();
  });
});
