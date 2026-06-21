import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  it('exposes modal semantics and closes with Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Dialog isOpen onClose={onClose} title="确认操作">
        <button type="button">确认</button>
      </Dialog>,
    );

    const dialog = screen.getByRole('dialog', { name: '确认操作' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(document.body.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('moves focus into the dialog and restores previous focus when closed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { rerender } = render(
      <>
        <button type="button">打开</button>
        <Dialog isOpen={false} onClose={onClose} title="设置">
          <button type="button">保存</button>
        </Dialog>
      </>,
    );

    const opener = screen.getByRole('button', { name: '打开' });
    await user.click(opener);
    expect(opener).toHaveFocus();

    rerender(
      <>
        <button type="button">打开</button>
        <Dialog isOpen onClose={onClose} title="设置">
          <button type="button">保存</button>
        </Dialog>
      </>,
    );

    await waitFor(() => expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus());

    rerender(
      <>
        <button type="button">打开</button>
        <Dialog isOpen={false} onClose={onClose} title="设置">
          <button type="button">保存</button>
        </Dialog>
      </>,
    );

    await waitFor(() => expect(opener).toHaveFocus());
  });
});
