import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PoetSelector from './PoetSelector';

describe('PoetSelector', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('should render poet selector with label', () => {
    render(<PoetSelector value="A" onChange={mockOnChange} />);

    expect(screen.getByLabelText('시인 선택')).toBeInTheDocument();
  });

  it('should display the selected poet', () => {
    render(<PoetSelector value="A" onChange={mockOnChange} />);

    expect(screen.getByRole('combobox')).toHaveTextContent('서정주');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<PoetSelector value="A" onChange={mockOnChange} disabled />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-disabled', 'true');
  });

  it('should not be disabled by default', () => {
    render(<PoetSelector value="A" onChange={mockOnChange} />);

    const select = screen.getByRole('combobox');
    expect(select).not.toHaveAttribute('aria-disabled', 'true');
  });
});
