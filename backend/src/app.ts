import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes';
import { globalErrorHandler, notFoundHandler } from './middleware/errorHandler';

const app: Application = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
app.use('/', routes);

// Error handlers
app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
