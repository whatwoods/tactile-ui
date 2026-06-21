import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('defaults to a non-submitting native button', () => {
    render(<Button>保存</Button>);

    expect(screen.getByRole('button', { name: '保存' })).toHaveAttribute('type', 'button');
  });

  it('disables interaction and exposes busy state while loading', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button loading onClick={onClick}>
        保存
      </Button>,
    );

    const button = screen.getByRole('button', { name: '保存' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
