import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, type TabItem } from './Tabs';

const items: TabItem[] = [
  { id: 'general', label: '通用', content: '通用内容' },
  { id: 'audio', label: '声音', content: '声音内容' },
  { id: 'display', label: '显示', content: '显示内容', disabled: true },
  { id: 'about', label: '关于', content: '关于内容' },
];

describe('Tabs', () => {
  it('selects the next enabled tab automatically with arrow keys', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Tabs items={items} defaultValue="general" onChange={onChange} />);

    const general = screen.getByRole('tab', { name: '通用' });
    general.focus();

    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: '声音' })).toHaveAttribute('aria-selected', 'true');
    expect(onChange).toHaveBeenCalledWith('audio');

    await user.keyboard('{End}');

    expect(screen.getByRole('tab', { name: '关于' })).toHaveAttribute('aria-selected', 'true');
    expect(onChange).toHaveBeenLastCalledWith('about');
  });

  it('supports manual activation mode', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Tabs
        items={items}
        defaultValue="general"
        activationMode="manual"
        onChange={onChange}
      />,
    );

    screen.getByRole('tab', { name: '通用' }).focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: '通用' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: '声音' })).toHaveFocus();
    expect(onChange).not.toHaveBeenCalled();

    await user.keyboard('{Enter}');

    expect(screen.getByRole('tab', { name: '声音' })).toHaveAttribute('aria-selected', 'true');
    expect(onChange).toHaveBeenCalledWith('audio');
  });
});
