import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { RegisterForm } from './RegisterForm';

describe('RegisterForm', () => {
  it('renders the fields, remember checkbox and submit button', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText('Nome')).toBeRequired();
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password');
    expect(screen.getByRole('checkbox', { name: 'Lembrar-me' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toHaveAttribute('type', 'submit');
  });

  it('submits the typed values', async () => {
    const handleSubmit = vi.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);

    await userEvent.type(screen.getByLabelText('Nome'), 'Ana Souza');
    await userEvent.type(screen.getByLabelText('Email'), 'ana@email.com');
    await userEvent.type(screen.getByLabelText('Senha'), 'segredo123');
    await userEvent.click(screen.getByLabelText('Lembrar-me'));
    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'Ana Souza',
      email: 'ana@email.com',
      password: 'segredo123',
      remember: true,
    });
  });

  it('does not submit while required fields are empty', async () => {
    const handleSubmit = vi.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);
    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
