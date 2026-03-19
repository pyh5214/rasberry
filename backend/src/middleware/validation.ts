import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { ErrorResponse, PoetOption } from '../types';

export const validatePoemRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const file = req.file;
  const option = req.body.option as PoetOption | undefined;

  console.log('=== Request received ===');
  console.log('File info:', {
    hasFile: !!file,
    fileName: file?.originalname,
    fileSize: file?.size,
    mimetype: file?.mimetype,
    option: option
  });

  if (!file) {
    console.error('No file uploaded');
    res.status(400).json({ error: 'No image uploaded.' } as ErrorResponse);
    return;
  }

  if (!config.apiKey) {
    console.error('API key not set');
    res.status(500).json({
      error: 'Server configuration error: API key not set.',
      details: 'Please set API_KEY in backend/.env file.'
    } as ErrorResponse);
    return;
  }

  next();
};

export const validatePoetOption = (option: string | undefined): PoetOption => {
  const validOptions: PoetOption[] = ['A', 'B', 'C', 'D'];
  if (option && validOptions.includes(option as PoetOption)) {
    return option as PoetOption;
  }
  return 'A';
};
