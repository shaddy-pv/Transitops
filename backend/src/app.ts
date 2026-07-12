import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { logger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import { setupSwagger } from './config/swagger';

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP Request Logging
app.use(
  morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

import routes from './routes';

// API Routes will be mounted here
app.use('/api/v1', routes);

setupSwagger(app);

// Global Error Handler
app.use(errorHandler);

export default app;
