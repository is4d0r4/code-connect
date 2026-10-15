import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders as a single accessible image built from the svg parts', () => {
    render(<Logo />);
    const logo = screen.getByRole('img', { name: 'code connect' });
    expect(logo.querySelectorAll('img')).toHaveLength(3);
  });
});
