import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
  it('toggles uncontrolled state by keyboard and click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Switch defaultChecked={false} onChange={onChange} />);

    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'false');

    fireEvent.keyDown(toggle, { key: ' ' });
    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(toggle).toHaveAttribute('aria-checked', 'true');

    await user.click(toggle);
    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('reports controlled changes without mutating aria state itself', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Switch checked={false} onChange={onChange} />);

    const toggle = screen.getByRole('switch');
    await user.click(toggle);

    expect(onChange).toHaveBeenCalledWith(true);
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });
});
