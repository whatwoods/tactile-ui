import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { List } from './List';
import { ListItem } from './ListItem';

describe('List', () => {
  it('renders clickable rows as buttons and respects disabled state', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <List>
        <ListItem title="网络" subtitle="已连接" value="Wi-Fi" onClick={onClick} />
        <ListItem title="定位" disabled onClick={onClick} />
      </List>,
    );

    await user.click(screen.getByRole('button', { name: /网络/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: '定位' })).toBeDisabled();
  });
});
