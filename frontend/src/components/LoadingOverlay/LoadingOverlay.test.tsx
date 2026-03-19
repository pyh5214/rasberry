import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingOverlay from './LoadingOverlay';

describe('LoadingOverlay', () => {
  it('should not render when loading is false', () => {
    render(<LoadingOverlay loading={false} />);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should render when loading is true', () => {
    render(<LoadingOverlay loading={true} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should display default message', () => {
    render(<LoadingOverlay loading={true} />);

    expect(screen.getByText('시를 생성하는 중...')).toBeInTheDocument();
  });

  it('should display custom message when provided', () => {
    const customMessage = '이미지 분석 중...';
    render(<LoadingOverlay loading={true} message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });
});
