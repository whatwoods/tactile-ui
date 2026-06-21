import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  it('uses status semantics for non-urgent tones', () => {
    render(<Alert title="已保存">设置已经更新</Alert>);

    expect(screen.getByRole('status', { name: '已保存' })).toHaveTextContent('设置已经更新');
  });

  it('uses alert semantics for warning and supports close action', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Alert tone="warning" title="注意" onClose={onClose}>
        当前操作不可撤销
      </Alert>,
    );

    expect(screen.getByRole('alert', { name: '注意' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '关闭提示' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
