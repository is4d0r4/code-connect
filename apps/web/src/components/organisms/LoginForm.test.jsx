import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders the fields, remember checkbox, forgot link and submit button', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Email ou usuário')).toBeRequired();
    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password');
    expect(screen.getByRole('checkbox', { name: 'Lembrar-me' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Esqueci a senha' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toHaveAttribute('type', 'submit');
  });

  it('submits the typed values', async () => {
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    await userEvent.type(screen.getByLabelText('Email ou usuário'), 'ana@email.com');
    await userEvent.type(screen.getByLabelText('Senha'), 'segredo123');
    await userEvent.click(screen.getByLabelText('Lembrar-me'));
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(handleSubmit).toHaveBeenCalledWith({
      login: 'ana@email.com',
      password: 'segredo123',
      remember: true,
    });
  });

  it('does not submit while required fields are empty', async () => {
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
