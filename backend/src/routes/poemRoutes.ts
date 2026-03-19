import { Router, Request, Response, NextFunction } from 'express';
import { upload } from '../middleware/upload';
import { handleMulterError } from '../middleware/errorHandler';
import { validatePoemRequest } from '../middleware/validation';
import { generatePoem } from '../controllers/poemController';

const router = Router();

router.post(
  '/generate-poem',
  (req: Request, res: Response, next: NextFunction) => {
    upload.single('image')(req, res, (err: unknown) => {
      if (err) {
        return handleMulterError(err as Error, req, res, next);
      }
      next();
    });
  },
  validatePoemRequest,
  generatePoem
);

export default router;
