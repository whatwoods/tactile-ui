import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders an indeterminate progressbar with an accessible label', () => {
    render(<Spinner label="加载中" />);

    expect(screen.getByRole('progressbar', { name: '加载中' })).toBeInTheDocument();
  });
});
