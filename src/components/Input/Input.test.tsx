import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('connects labels and error state to the native input', () => {
    render(<Input label="邮箱" error="请输入邮箱" />);

    const input = screen.getByLabelText('邮箱');
    expect(input.className).toContain('hasError');
    expect(screen.getByText('请输入邮箱')).toBeInTheDocument();
  });

  it('toggles password visibility with an accessible control', async () => {
    const user = userEvent.setup();

    render(<Input label="密码" type="password" />);

    const input = screen.getByLabelText('密码');
    expect(input).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: '显示密码' }));
    expect(input).toHaveAttribute('type', 'text');

    await user.click(screen.getByRole('button', { name: '隐藏密码' }));
    expect(input).toHaveAttribute('type', 'password');
  });
});
