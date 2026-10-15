import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { RegisterPage } from './RegisterPage';

describe('RegisterPage', () => {
  it('renders the cadastro layout', () => {
    render(<RegisterPage />);
    expect(screen.getByRole('heading', { name: 'Cadastro' })).toBeInTheDocument();
    expect(screen.getByText('Olá! Preencha seus dados.')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'code connect' })).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Github' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Faça seu login!' })).toHaveAttribute('href', '/login');
  });

  it('forwards register and social handlers', async () => {
    const onRegister = vi.fn();
    const onSocialLogin = vi.fn();
    render(<RegisterPage onRegister={onRegister} onSocialLogin={onSocialLogin} />);

    await userEvent.type(screen.getByLabelText('Nome'), 'Ana');
    await userEvent.type(screen.getByLabelText('Email'), 'ana@email.com');
    await userEvent.type(screen.getByLabelText('Senha'), '123');
    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));
    expect(onRegister).toHaveBeenCalledWith({
      name: 'Ana',
      email: 'ana@email.com',
      password: '123',
      remember: false,
    });

    await userEvent.click(screen.getByRole('button', { name: 'Gmail' }));
    expect(onSocialLogin).toHaveBeenCalledWith('google');
  });
});
