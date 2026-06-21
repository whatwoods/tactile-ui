import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TitleBar } from './TitleBar';

describe('TitleBar', () => {
  it('renders navigation actions as native buttons', async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    const onConfirm = vi.fn();

    render(<TitleBar title="设置" onBack={onBack} confirmLabel="完成" onConfirm={onConfirm} />);

    await user.click(screen.getByRole('button', { name: '返回' }));
    await user.click(screen.getByRole('button', { name: '完成' }));

    expect(screen.getByRole('heading', { name: '设置' })).toBeInTheDocument();
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
