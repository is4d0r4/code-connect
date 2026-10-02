import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon } from './Icon';

describe('Icon', () => {
  it.each(['arrow-right', 'clipboard', 'chain'])(
    'renders the %s icon hidden from assistive tech',
    (name) => {
      const { container } = render(<Icon name={name} />);
      const svg = container.querySelector(`svg[data-icon="${name}"]`);
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    }
  );

  it('exposes an accessible name when title is given', () => {
    render(<Icon name="arrow-right" title="Avançar" />);
    expect(screen.getByRole('img', { name: 'Avançar' })).toBeInTheDocument();
  });

  it('renders nothing for an unknown name', () => {
    const { container } = render(<Icon name="unknown" />);
    expect(container).toBeEmptyDOMElement();
  });
});
