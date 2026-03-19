import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PoemDisplay from './PoemDisplay';

describe('PoemDisplay', () => {
  it('should not render when poem is empty', () => {
    render(<PoemDisplay poem="" />);

    expect(screen.queryByText('생성된 시')).not.toBeInTheDocument();
  });

  it('should render title when poem is provided', () => {
    const testPoem = '봄이 오면\n꽃이 핀다';
    render(<PoemDisplay poem={testPoem} />);

    expect(screen.getByText('생성된 시')).toBeInTheDocument();
  });

  it('should render poem content in textarea', () => {
    const testPoem = '테스트 시';
    render(<PoemDisplay poem={testPoem} />);

    // MUI TextField renders as textarea for multiline
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(testPoem);
  });

  it('should have readonly textarea', () => {
    const testPoem = '읽기 전용 시';
    render(<PoemDisplay poem={testPoem} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readonly');
  });

  it('should preserve newlines in poem', () => {
    const poemWithNewlines = '첫 번째 줄\n두 번째 줄';
    render(<PoemDisplay poem={poemWithNewlines} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(poemWithNewlines);
  });
});
