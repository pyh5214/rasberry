import React, { useState } from 'react';
import axios from 'axios';
import { Box, Paper, Typography } from '@mui/material';
import { PoetOption } from './types';
import { CameraCapture } from './components/CameraCapture';
import { PoetSelector } from './components/PoetSelector';
import { PoemDisplay } from './components/PoemDisplay';
import { ImageUpload } from './components/ImageUpload';
import { LoadingOverlay } from './components/LoadingOverlay';

const App: React.FC = () => {
  const [poem, setPoem] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [poetOption, setPoetOption] = useState<PoetOption>('A');

  const handleSubmit = async (imageFileOrBlob: File | Blob): Promise<void> => {
    const formData = new FormData();

    if (imageFileOrBlob instanceof File) {
      formData.append('image', imageFileOrBlob);
    } else {
      formData.append('image', imageFileOrBlob, 'captured-image.png');
    }
    formData.append('option', poetOption);

    setLoading(true);
    setPoem('');

    try {
      const response = await axios.post<{ poem: string }>('http://localhost:5000/generate-poem', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000,
      });
      setPoem(response.data.poem);
    } catch (error) {
      console.error('시 생성 오류:', error);
      let errorMessage = '시 생성 중 오류가 발생했습니다.';

      if (axios.isAxiosError(error)) {
        if (error.response) {
          const serverError = error.response.data as { error?: string; details?: string };
          errorMessage = serverError?.error || errorMessage;
          if (serverError?.details) {
            errorMessage += `\n\n상세: ${serverError.details}`;
          }
        } else if (error.request) {
          errorMessage = '서버에 연결할 수 없습니다.\n백엔드 서버가 실행 중인지 확인해주세요.';
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = '요청 시간이 초과되었습니다.\n네트워크 연결을 확인하고 다시 시도해주세요.';
        } else {
          errorMessage = error.message || errorMessage;
        }
      }
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCapture = (blob: Blob): void => {
    setCameraActive(false);
    handleSubmit(blob);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        padding: 2,
        backgroundColor: '#f5f5f5'
      }}
    >
      {cameraActive ? (
        <CameraCapture onCapture={handleCapture} onCancel={() => setCameraActive(false)} />
      ) : (
        <Paper elevation={3} sx={{ textAlign: 'center', maxWidth: '600px', width: '100%', padding: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
            POEM
          </Typography>
          <PoetSelector value={poetOption} onChange={setPoetOption} disabled={loading} />
          <ImageUpload
            onFileSelect={handleSubmit}
            onCameraClick={() => setCameraActive(true)}
            disabled={loading}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            파일을 업로드하거나 카메라로 사진을 촬영하세요
          </Typography>
          <LoadingOverlay loading={loading} />
          <PoemDisplay poem={poem} />
        </Paper>
      )}
    </Box>
  );
};

export default App;
