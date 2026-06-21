import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SettingItem } from './SettingItem';

describe('SettingItem', () => {
  it('uses the row as the switch interaction owner', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(<SettingItem title="蓝牙" accessory="switch" onCheckedChange={onCheckedChange} />);

    await user.click(screen.getByRole('button', { name: '蓝牙' }));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('switch')).not.toBeInTheDocument();
  });

  it('exposes pressed state for selectable check rows', () => {
    render(<SettingItem title="深色模式" accessory="check" selected onClick={vi.fn()} />);

    expect(screen.getByRole('button', { name: '深色模式' })).toHaveAttribute('aria-pressed', 'true');
  });
});
