import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chassis } from './Chassis';

describe('Chassis', () => {
  it('toggles power and reports state changes', async () => {
    const user = userEvent.setup();
    const onPowerChange = vi.fn();

    render(
      <Chassis title="控制台" model="T1" audioEnabled={false} onPowerChange={onPowerChange}>
        主内容
      </Chassis>,
    );

    await user.click(screen.getByRole('button', { name: 'Toggle power for 控制台' }));

    expect(onPowerChange).toHaveBeenCalledWith(false);
    expect(screen.getByText('[ STANDBY ]')).toBeInTheDocument();
  });
});
