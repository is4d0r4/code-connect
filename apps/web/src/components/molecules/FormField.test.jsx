import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { FormField } from './FormField';

describe('FormField', () => {
  it('links the label to the input', () => {
    render(<FormField label="Email ou usuário" />);
    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument();
  });

  it('uses the given id and forwards input props', () => {
    render(<FormField label="Senha" id="password" type="password" required />);
    const input = screen.getByLabelText('Senha');
    expect(input).toHaveAttribute('id', 'password');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toBeRequired();
  });

  it('accepts typing', async () => {
    render(<FormField label="Email" />);
    await userEvent.type(screen.getByLabelText('Email'), 'ana');
    expect(screen.getByLabelText('Email')).toHaveValue('ana');
  });
});
