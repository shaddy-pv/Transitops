import { createServer } from 'http';
import app from './app';
import { env } from './config/env';
import { connectDB } from './config/database';
import { logger } from './middlewares/logger';
import { initSocket } from './config/socket';
import { initCronJobs } from './jobs/cron';

const startServer = async () => {
  await connectDB();

  const httpServer = createServer(app);
  
  // Initialize Socket.io
  initSocket(httpServer);
  
  // Initialize Cron Jobs
  initCronJobs();

  const server = httpServer.listen(env.PORT, () => {
    logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err: Error) => {
    logger.error(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
};

startServer();
