import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders a text input by default', () => {
    render(<Input aria-label="Nome" />);
    expect(screen.getByLabelText('Nome')).toHaveAttribute('type', 'text');
  });

  it('forwards native props', () => {
    render(<Input aria-label="Senha" type="password" name="password" autoComplete="current-password" />);
    const input = screen.getByLabelText('Senha');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('name', 'password');
    expect(input).toHaveAttribute('autocomplete', 'current-password');
  });

  it('accepts typing', async () => {
    render(<Input aria-label="Email" />);
    const input = screen.getByLabelText('Email');
    await userEvent.type(input, 'ana@email.com');
    expect(input).toHaveValue('ana@email.com');
  });
});
