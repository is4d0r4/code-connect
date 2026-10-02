import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  it('renders the login layout', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText('Boas-vindas! Faça seu login.')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /code connect/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Github' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Crie seu cadastro!' })).toHaveAttribute(
      'href',
      '/cadastro'
    );
  });

  it('forwards login and social handlers', async () => {
    const onLogin = vi.fn();
    const onSocialLogin = vi.fn();
    render(<LoginPage onLogin={onLogin} onSocialLogin={onSocialLogin} />);

    await userEvent.type(screen.getByLabelText('Email ou usuário'), 'ana');
    await userEvent.type(screen.getByLabelText('Senha'), '123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(onLogin).toHaveBeenCalledWith({ login: 'ana', password: '123', remember: false });

    await userEvent.click(screen.getByRole('button', { name: 'Gmail' }));
    expect(onSocialLogin).toHaveBeenCalledWith('google');
  });
});
