import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SocialButton } from './SocialButton';

describe('SocialButton', () => {
  it('renders the provider name as the accessible name', () => {
    const { container } = render(<SocialButton iconSrc="/Github.png" label="Github" />);
    const button = screen.getByRole('button', { name: 'Github' });
    expect(button).toHaveAttribute('type', 'button');
    expect(container.querySelector('img')).toHaveAttribute('src', '/Github.png');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<SocialButton iconSrc="/Google.png" label="Gmail" onClick={handleClick} />);
    await userEvent.click(screen.getByRole('button', { name: 'Gmail' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
