import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthHeader } from './AuthHeader';

describe('AuthHeader', () => {
  it('renders the title as a heading and the subtitle', () => {
    render(<AuthHeader title="Login" subtitle="Boas-vindas! Faça seu login." />);
    expect(screen.getByRole('heading', { level: 1, name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText('Boas-vindas! Faça seu login.')).toBeInTheDocument();
  });

  it('omits the subtitle when not given', () => {
    const { container } = render(<AuthHeader title="Login" />);
    expect(container.querySelector('p')).toBeNull();
  });
});
