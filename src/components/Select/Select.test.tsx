import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const options = [
  { label: '中国', value: 'CN' },
  { label: '日本', value: 'JP' },
  { label: '美国', value: 'US' },
];

describe('Select', () => {
  it('opens with combobox semantics and selects an option by click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Select
        label="国家"
        options={options}
        defaultValue="CN"
        onChange={onChange}
      />,
    );

    const trigger = screen.getByRole('combobox', { name: /国家 中国/ });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.click(screen.getByRole('option', { name: '日本' }));

    expect(onChange).toHaveBeenCalledWith('JP');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('moves the active option with arrows without committing until Enter', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Select
        label="国家"
        options={options}
        defaultValue="CN"
        onChange={onChange}
      />,
    );

    const trigger = screen.getByRole('combobox', { name: /国家 中国/ });
    trigger.focus();

    await user.keyboard('{ArrowDown}');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(onChange).not.toHaveBeenCalled();

    await user.keyboard('{ArrowDown}');
    expect(trigger.getAttribute('aria-activedescendant')).toContain('JP');
    expect(onChange).not.toHaveBeenCalled();

    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith('JP');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes on Escape without changing the value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Select
        ariaLabel="选择国家"
        options={options}
        defaultValue="CN"
        onChange={onChange}
      />,
    );

    const trigger = screen.getByRole('combobox', { name: '选择国家' });
    trigger.focus();

    await user.keyboard('{ArrowDown}{ArrowDown}{Escape}');

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
