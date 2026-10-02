import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthRedirect } from './AuthRedirect';

describe('AuthRedirect', () => {
  it('renders the question and the link', () => {
    render(
      <AuthRedirect question="Ainda não tem conta?" linkText="Crie seu cadastro!" href="/cadastro" />
    );
    expect(screen.getByText('Ainda não tem conta?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Crie seu cadastro!' })).toHaveAttribute(
      'href',
      '/cadastro'
    );
  });

  it('renders the icon inside the link when given', () => {
    render(
      <AuthRedirect
        question="Ainda não tem conta?"
        linkText="Crie seu cadastro!"
        href="/cadastro"
        icon="clipboard"
      />
    );
    expect(
      screen.getByRole('link').querySelector('svg[data-icon="clipboard"]')
    ).toBeInTheDocument();
  });
});
