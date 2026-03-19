export interface ImageData {
  base64: string;
  mimeType: string;
  dataUrl: string;
}

export const convertFileToBase64 = (file: Express.Multer.File): ImageData => {
  const base64 = file.buffer.toString('base64');
  const mimeType = file.mimetype || 'image/png';
  const dataUrl = `data:${mimeType};base64,${base64}`;

  console.log('Image encoding complete (size:', base64.length, 'bytes)');

  return {
    base64,
    mimeType,
    dataUrl
  };
};
