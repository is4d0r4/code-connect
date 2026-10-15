import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthTemplate } from './AuthTemplate';

describe('AuthTemplate', () => {
  it('renders the banner and the children inside the main card', () => {
    render(
      <AuthTemplate bannerSrc="/banner.png" bannerAlt="Pessoa programando">
        <p>Conteúdo do formulário</p>
      </AuthTemplate>
    );
    expect(screen.getByRole('img', { name: 'Pessoa programando' })).toHaveAttribute(
      'src',
      '/banner.png'
    );
    expect(screen.getByRole('main')).toContainElement(screen.getByText('Conteúdo do formulário'));
  });

  it('renders the decorative chain marks hidden from assistive tech', () => {
    const { container } = render(
      <AuthTemplate bannerSrc="/banner.png" bannerAlt="Banner">
        <p>x</p>
      </AuthTemplate>
    );
    const marks = container.querySelectorAll('svg[data-icon="chain"]');
    expect(marks).toHaveLength(2);
    marks.forEach((mark) => expect(mark).toHaveAttribute('aria-hidden', 'true'));
  });
});

describe('AuthTemplate banner options', () => {
  it('renders the banner overlay and extra banner classes', () => {
    render(
      <AuthTemplate
        bannerSrc="/banner.png"
        bannerAlt="Banner"
        bannerClassName="object-[60%_center]"
        bannerOverlay={<span>Logo</span>}
      >
        <p>x</p>
      </AuthTemplate>
    );
    expect(screen.getByRole('img', { name: 'Banner' })).toHaveClass('object-[60%_center]');
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });
});
