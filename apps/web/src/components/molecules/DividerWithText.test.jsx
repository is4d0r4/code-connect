import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DividerWithText } from './DividerWithText';

describe('DividerWithText', () => {
  it('renders the text between the lines', () => {
    render(<DividerWithText>ou entre com outras contas</DividerWithText>);
    expect(screen.getByText('ou entre com outras contas')).toBeInTheDocument();
  });
});
