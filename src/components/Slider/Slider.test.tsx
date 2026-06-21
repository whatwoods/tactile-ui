import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Slider } from './Slider';

describe('Slider', () => {
  it('exposes slider semantics and supports keyboard changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Slider
        ariaLabel="音量"
        min={0}
        max={10}
        step={2}
        defaultValue={4}
        onChange={onChange}
        getAriaValueText={(value) => `${value} 格`}
      />,
    );

    const slider = screen.getByRole('slider', { name: '音量' });
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '10');
    expect(slider).toHaveAttribute('aria-valuenow', '4');
    expect(slider).toHaveAttribute('aria-valuetext', '4 格');

    slider.focus();
    await user.keyboard('{ArrowRight}');

    expect(onChange).toHaveBeenLastCalledWith(6);
    expect(slider).toHaveAttribute('aria-valuenow', '6');
    expect(slider).toHaveAttribute('aria-valuetext', '6 格');

    await user.keyboard('{Home}');
    expect(onChange).toHaveBeenLastCalledWith(0);
    expect(slider).toHaveAttribute('aria-valuenow', '0');
  });

  it('steps through marks and commits mark button clicks', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Slider
        ariaLabel="亮度"
        min={0}
        max={100}
        defaultValue={50}
        marks={[
          { value: 0, label: '低' },
          { value: 50, label: '中' },
          { value: 100, label: '高' },
        ]}
        onChange={onChange}
      />,
    );

    const slider = screen.getByRole('slider', { name: '亮度' });
    slider.focus();

    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenLastCalledWith(100);
    expect(slider).toHaveAttribute('aria-valuenow', '100');

    await user.click(screen.getByRole('button', { name: '低' }));
    expect(onChange).toHaveBeenLastCalledWith(0);
    expect(slider).toHaveAttribute('aria-valuenow', '0');
  });
});
