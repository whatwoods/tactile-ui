import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionSheet } from './ActionSheet';

describe('ActionSheet', () => {
  it('renders modal dialog semantics and locks body scroll', () => {
    render(<ActionSheet isOpen onClose={vi.fn()} title="更多操作" />);

    expect(screen.getByRole('dialog', { name: '更多操作' })).toHaveAttribute('aria-modal', 'true');
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('runs an action then requests close', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    const onClose = vi.fn();

    render(
      <ActionSheet
        isOpen
        onClose={onClose}
        title="更多操作"
        actions={[{ label: '删除', onClick: onAction, variant: 'danger' }]}
      />,
    );

    await user.click(screen.getByRole('button', { name: '删除' }));

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
