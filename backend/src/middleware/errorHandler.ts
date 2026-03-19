import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { ErrorResponse } from '../types';

export const handleMulterError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof multer.MulterError) {
    console.error('Multer error:', err);
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ error: 'File size too large. (Max 10MB)' } as ErrorResponse);
      return;
    }
    res.status(400).json({ error: `File upload error: ${err.message}` } as ErrorResponse);
    return;
  }
  if (err) {
    console.error('File upload related error:', err);
    res.status(400).json({ error: `File processing error: ${err.message}` } as ErrorResponse);
    return;
  }
  next();
};

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Global error handler:', err);
  res.status(500).json({
    error: 'Internal server error.',
    details: err.message
  } as ErrorResponse);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({ error: 'Requested path not found.' } as ErrorResponse);
};
