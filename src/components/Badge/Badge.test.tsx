import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('caps numeric counts at the provided maximum', () => {
    render(<Badge count={120} max={99} />);

    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('exposes a label for dot badges with string children', () => {
    render(<Badge dot>在线</Badge>);

    expect(screen.getByLabelText('在线')).toBeInTheDocument();
  });
});
