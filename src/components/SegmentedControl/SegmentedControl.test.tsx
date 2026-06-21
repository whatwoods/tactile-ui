import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SegmentedControl } from './SegmentedControl';

const options = [
  { label: '极速', value: 'fast' },
  { label: '均衡', value: 'balanced' },
  { label: '省电', value: 'eco', disabled: true },
  { label: '无损', value: 'lossless' },
];

describe('SegmentedControl', () => {
  it('uses radio semantics and skips disabled options with keyboard navigation', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <SegmentedControl
        options={options}
        defaultValue="balanced"
        onChange={onChange}
      />,
    );

    const active = screen.getByRole('radio', { name: '均衡' });
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(active).toHaveAttribute('aria-checked', 'true');

    active.focus();
    await user.keyboard('{ArrowRight}');

    expect(onChange).toHaveBeenCalledWith('lossless');
    expect(screen.getByRole('radio', { name: '无损' })).toHaveAttribute('aria-checked', 'true');
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <SegmentedControl
        options={options}
        defaultValue="fast"
        disabled
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole('radio', { name: '均衡' }));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-disabled', 'true');
  });
});
