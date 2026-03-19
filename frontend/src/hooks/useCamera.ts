import { useState, useRef, useCallback, useEffect } from 'react';

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  cameraActive: boolean;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  captureImage: () => Promise<Blob | null>;
}

export const useCamera = (): UseCameraReturn => {
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      console.error('카메라 접근 오류:', err);
      throw new Error('카메라에 접근할 수 없습니다. 권한을 확인해주세요.');
    }
  }, []);

  const captureImage = useCallback(async (): Promise<Blob | null> => {
    if (!videoRef.current || !canvasRef.current) {
      return null;
    }

    const context = canvasRef.current.getContext('2d');
    if (!context) {
      return null;
    }

    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    stopCamera();

    return new Promise((resolve) => {
      canvasRef.current?.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    });
  }, [stopCamera]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return {
    videoRef,
    canvasRef,
    cameraActive,
    startCamera,
    stopCamera,
    captureImage
  };
};
