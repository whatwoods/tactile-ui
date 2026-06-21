import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('connects label, invalid state, and error description', () => {
    render(<Textarea label="备注" error="备注不能为空" />);

    const textarea = screen.getByLabelText('备注');
    const error = screen.getByText('备注不能为空');

    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', error.id);
  });
});
