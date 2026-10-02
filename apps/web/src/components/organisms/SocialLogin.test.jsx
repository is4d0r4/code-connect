import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SocialLogin } from './SocialLogin';

describe('SocialLogin', () => {
  it('renders the divider and the default providers', () => {
    render(<SocialLogin />);
    expect(screen.getByText('ou entre com outras contas')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Github' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Gmail' })).toBeInTheDocument();
  });

  it('calls onSelect with the provider id', async () => {
    const handleSelect = vi.fn();
    render(<SocialLogin onSelect={handleSelect} />);
    await userEvent.click(screen.getByRole('button', { name: 'Github' }));
    expect(handleSelect).toHaveBeenCalledWith('github');
  });

  it('renders custom providers', () => {
    render(<SocialLogin providers={[{ id: 'gitlab', label: 'Gitlab', iconSrc: '/gitlab.png' }]} />);
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Gitlab' })).toBeInTheDocument();
  });
});
