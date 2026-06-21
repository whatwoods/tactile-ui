import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('is decorative without a label and named when labelled', () => {
    const { container, rerender } = render(<Icon><svg /></Icon>);

    expect(container.querySelector('span')).toHaveAttribute('aria-hidden', 'true');

    rerender(<Icon label="设置"><svg /></Icon>);
    expect(screen.getByRole('img', { name: '设置' })).toBeInTheDocument();
  });
});
