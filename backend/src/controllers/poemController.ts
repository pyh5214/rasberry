import { Request, Response, NextFunction } from 'express';
import { poetPrompts } from '../config/prompts';
import { convertFileToBase64 } from '../services/imageService';
import { generatePoemFromImage, handleOpenAIError } from '../services/openaiService';
import { validatePoetOption } from '../middleware/validation';
import { PoemResponse, ErrorResponse, PoetOption } from '../types';

export const generatePoem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const file = req.file;
    const option = req.body.option as string | undefined;

    if (!file) {
      res.status(400).json({ error: 'No image uploaded.' } as ErrorResponse);
      return;
    }

    const validatedOption: PoetOption = validatePoetOption(option);
    const systemPrompt = poetPrompts[validatedOption];
    console.log('Selected poet option:', validatedOption);

    console.log('Starting image file processing...');
    const imageData = convertFileToBase64(file);

    const result = await generatePoemFromImage(imageData.dataUrl, systemPrompt);

    res.json({ poem: result.poem } as PoemResponse);
  } catch (error) {
    const { errorMessage, errorDetails } = handleOpenAIError(error);

    if (!res.headersSent) {
      res.status(500).json({
        error: errorMessage,
        details: errorDetails
      } as ErrorResponse);
    } else {
      next(error);
    }
  }
};
