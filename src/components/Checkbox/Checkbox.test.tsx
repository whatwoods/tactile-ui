import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders a labelled native checkbox', async () => {
    const user = userEvent.setup();

    render(<Checkbox label="启用同步" />);

    const checkbox = screen.getByRole('checkbox', { name: '启用同步' });
    expect(checkbox).not.toBeChecked();

    await user.click(screen.getByText('启用同步'));
    expect(checkbox).toBeChecked();
  });
});
