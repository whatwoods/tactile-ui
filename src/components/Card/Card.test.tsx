import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';

describe('Card', () => {
  it('renders title, content, and optional back action', async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();

    render(
      <Card title="面板" onBack={onBack}>
        内容
      </Card>,
    );

    expect(screen.getByRole('heading', { name: '面板' })).toBeInTheDocument();
    expect(screen.getByText('内容')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '返回' }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
