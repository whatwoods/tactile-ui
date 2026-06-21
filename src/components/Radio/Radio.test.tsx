import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders labelled native radios in a group', async () => {
    const user = userEvent.setup();

    render(
      <fieldset>
        <legend>模式</legend>
        <Radio name="mode" value="light" label="浅色" />
        <Radio name="mode" value="dark" label="深色" />
      </fieldset>,
    );

    await user.click(screen.getByRole('radio', { name: '深色' }));

    expect(screen.getByRole('radio', { name: '浅色' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '深色' })).toBeChecked();
  });
});
