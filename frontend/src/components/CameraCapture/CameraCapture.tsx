import React, { useRef, useEffect } from 'react';
import { Box, Button } from '@mui/material';

interface CameraCaptureProps {
  onCapture: (blob: Blob) => void;
  onCancel: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error('카메라 접근 오류:', err);
        alert('카메라에 접근할 수 없습니다. 권한을 확인해주세요.');
        onCancel();
      });

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [onCancel]);

  const stopStream = (): void => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const handleCapture = (): void => {
    if (!videoRef.current || !canvasRef.current) {
      return;
    }

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    stopStream();

    canvasRef.current.toBlob(blob => {
      if (blob) {
        onCapture(blob);
      }
    }, 'image/png');
  };

  const handleCancel = (): void => {
    stopStream();
    onCancel();
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        zIndex: 1000
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '80vh'
        }}
      />
      <Box sx={{ position: 'absolute', bottom: '40px', display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCapture}
          size="large"
        >
          촬영
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
          size="large"
          sx={{ color: 'white', borderColor: 'white' }}
        >
          취소
        </Button>
      </Box>
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
        width="640"
        height="480"
      />
    </Box>
  );
};

export default CameraCapture;
