import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider } from './Toast';
import { useToast } from './useToast';

const ToastHarness = () => {
  const { toast, clear } = useToast();

  return (
    <>
      <button type="button" onClick={() => toast('已保存')}>显示通知</button>
      <button type="button" onClick={() => toast({ title: '失败', variant: 'danger', duration: false })}>显示错误</button>
      <button type="button" onClick={clear}>清空通知</button>
    </>
  );
};

describe('ToastProvider', () => {
  it('shows status and alert toasts and supports clearing', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastHarness />
      </ToastProvider>,
    );

    await user.click(screen.getByRole('button', { name: '显示通知' }));
    expect(screen.getByRole('status')).toHaveTextContent('已保存');

    await user.click(screen.getByRole('button', { name: '显示错误' }));
    expect(screen.getByRole('alert')).toHaveTextContent('失败');

    await user.click(screen.getByRole('button', { name: '清空通知' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('runs toast actions before closing', async () => {
    const user = userEvent.setup();
    const action = vi.fn();

    const ActionHarness = () => {
      const { toast } = useToast();
      return (
        <button
          type="button"
          onClick={() => toast({
            title: '需要确认',
            duration: false,
            action: {
              label: '撤销',
              altText: '撤销操作',
              onClick: action,
            },
          })}
        >
          显示操作通知
        </button>
      );
    };

    render(
      <ToastProvider>
        <ActionHarness />
      </ToastProvider>,
    );

    await user.click(screen.getByRole('button', { name: '显示操作通知' }));
    await user.click(screen.getByRole('button', { name: '撤销操作' }));

    expect(action).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
