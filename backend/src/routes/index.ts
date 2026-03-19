import { Router, Request, Response } from 'express';
import poemRoutes from './poemRoutes';
import { config } from '../config';
import { HealthResponse } from '../types';

const router = Router();

// Health check endpoint
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Server is running normally.',
    apiKeySet: !!config.apiKey
  } as HealthResponse);
});

// Poem routes
router.use('/', poemRoutes);

export default router;
