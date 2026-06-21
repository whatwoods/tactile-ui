import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressDialog } from './ProgressDialog';

describe('ProgressDialog', () => {
  it('renders busy modal progress semantics', () => {
    render(<ProgressDialog isOpen title="同步中" message="正在上传数据" />);

    const dialog = screen.getByRole('dialog', { name: '同步中' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('正在上传数据')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');
  });
});
