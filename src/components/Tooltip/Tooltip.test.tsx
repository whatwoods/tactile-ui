import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('opens on focus and closes on Escape', async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="补充说明">
        <button type="button">帮助</button>
      </Tooltip>,
    );

    await user.tab();
    expect(screen.getByRole('tooltip')).toHaveTextContent('补充说明');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
