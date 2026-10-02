import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text content', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies primary variant by default', () => {
    render(<Button>Submit</Button>);
    const button = screen.getByText('Submit');
    expect(button).toHaveClass('bg-accent', 'text-surface');
  });

  it('applies secondary variant when specified', () => {
    render(<Button variant="secondary">Cancel</Button>);
    const button = screen.getByText('Cancel');
    expect(button).toHaveClass('border-accent', 'text-accent');
  });

  it('applies danger variant when specified', () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByText('Delete');
    expect(button).toHaveClass('bg-red-600', 'text-white');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('does not trigger click when disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    screen.getByText('Disabled').click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('accepts additional className prop', () => {
    render(<Button className="custom-class">Styled</Button>);
    const button = screen.getByText('Styled');
    expect(button).toHaveClass('custom-class');
  });

  it('stretches to full width when fullWidth is set', () => {
    render(<Button fullWidth>Wide</Button>);
    expect(screen.getByRole('button', { name: 'Wide' })).toHaveClass('w-full');
  });

  it('renders an icon alongside the text', () => {
    render(
      <Button>
        Login <svg data-testid="icon" />
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Login' });
    expect(button).toHaveClass('inline-flex', 'gap-2');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
