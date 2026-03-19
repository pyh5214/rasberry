import React, { useRef, ChangeEvent } from 'react';
import { Box, Button } from '@mui/material';
import { PhotoCamera, Upload } from '@mui/icons-material';

interface ImageUploadProps {
  onFileSelect: (file: File) => void;
  onCameraClick: () => void;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileSelect, onCameraClick, disabled = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    onFileSelect(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button
        variant="contained"
        startIcon={<Upload />}
        onClick={handleUploadClick}
        disabled={disabled}
        sx={{ minWidth: 150 }}
      >
        파일 업로드
      </Button>
      <Button
        variant="outlined"
        startIcon={<PhotoCamera />}
        onClick={onCameraClick}
        disabled={disabled}
        sx={{ minWidth: 150 }}
      >
        카메라 촬영
      </Button>
    </Box>
  );
};

export default ImageUpload;
