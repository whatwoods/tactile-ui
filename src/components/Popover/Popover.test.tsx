import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './Popover';

describe('Popover', () => {
  it('wires trigger aria state and closes on Escape', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Popover trigger={<button type="button">打开</button>} onOpenChange={onOpenChange}>
        <p>弹出内容</p>
      </Popover>,
    );

    const trigger = screen.getByRole('button', { name: '打开' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog')).toHaveTextContent('弹出内容');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });
});
