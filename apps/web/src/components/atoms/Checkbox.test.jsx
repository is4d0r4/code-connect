import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders a checkbox labelled by its text', () => {
    render(<Checkbox label="Lembrar-me" />);
    expect(screen.getByRole('checkbox', { name: 'Lembrar-me' })).not.toBeChecked();
  });

  it('toggles when the label is clicked', async () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Lembrar-me" onChange={handleChange} />);
    await userEvent.click(screen.getByText('Lembrar-me'));
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('uses the given id', () => {
    render(<Checkbox label="Lembrar-me" id="remember" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'remember');
  });
});
