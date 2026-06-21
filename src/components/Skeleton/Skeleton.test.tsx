import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders decorative placeholders', () => {
    const { container } = render(<Skeleton data-testid="placeholder" />);

    expect(screen.getByTestId('placeholder')).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
  });

  it('renders multiple text rows when requested', () => {
    const { container } = render(<Skeleton variant="text" rows={3} />);

    expect(container.querySelectorAll('span')).toHaveLength(3);
  });
});
