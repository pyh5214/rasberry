import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

interface PoemDisplayProps {
  poem: string;
}

const PoemDisplay: React.FC<PoemDisplayProps> = ({ poem }) => {
  if (!poem) {
    return null;
  }

  return (
    <Box sx={{ marginTop: 4, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        생성된 시
      </Typography>
      <TextField
        multiline
        fullWidth
        variant="outlined"
        value={poem}
        InputProps={{
          readOnly: true,
        }}
        sx={{
          whiteSpace: 'pre-wrap',
          marginTop: 2,
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#fff'
          }
        }}
      />
    </Box>
  );
};

export default PoemDisplay;
