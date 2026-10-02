import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TextLink } from './TextLink';

describe('TextLink', () => {
  it('renders a link with href', () => {
    render(<TextLink href="/recuperar-senha">Esqueci a senha</TextLink>);
    expect(screen.getByRole('link', { name: 'Esqueci a senha' })).toHaveAttribute(
      'href',
      '/recuperar-senha'
    );
  });

  it('uses the underline variant by default', () => {
    render(<TextLink href="#">Link</TextLink>);
    expect(screen.getByRole('link')).toHaveClass('underline');
  });

  it('applies the accent variant', () => {
    render(
      <TextLink href="/cadastro" variant="accent">
        Crie seu cadastro!
      </TextLink>
    );
    expect(screen.getByRole('link')).toHaveClass('text-accent');
  });
});
