import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingOverlayProps {
  loading: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  loading,
  message = '시를 생성하는 중...'
}) => {
  if (!loading) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <CircularProgress />
      <Typography variant="body1" sx={{ ml: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingOverlay;
